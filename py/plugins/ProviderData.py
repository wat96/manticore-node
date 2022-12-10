from .BasePlugin import BasePlugin
from utils import (
    bigNumberToInt,
    hexStringToBytes,
    hexStringToInt,
    sanitizeJsAddr
)

class ProviderData(BasePlugin):
    providedStorage = {}
    emulateAddresses = {} # addresses to emulate from provider
    getContractCB = None
    getStorageCB = None

    def add_getContractCB(self, cb):
        self.getContractCB = cb
    
    def add_getStorageCB(self, cb):
        self.getStorageCB = cb
    
    def register_address(self, addr):
        adj_addr = sanitizeJsAddr(addr)
        self.emulateAddresses[adj_addr] = False
    
    def address_exists_in_world(self, addr, world):
        return world.account_exists(addr) and self.emulateAddresses.get(addr, True)
    
    def copy_account_to_world(self, world, address_int):
        # if address copied or no callback defined, exit early
        if self.getContractCB is None:
            return
        if self.address_exists_in_world(address_int, world):
            return

        # create account from callback data
        address_to_get = hex(address_int)
        address_info = self.getContractCB(address_to_get)
        if not world.account_exists(address_int):
            world.create_account(address=address_int)
        world.set_balance(address_int, bigNumberToInt(address_info.balance))
        world.set_nonce(address_int, address_info.nonce)
        world.set_code(address_int, hexStringToBytes(address_info.code))

        # create an entry for provided storage
        self.providedStorage[address_int] = {}
        self.emulateAddresses[address_int] = True
    
    def will_open_transaction_callback(self, state, tx):
        address_int = tx.address 
        if address_int in self.emulateAddresses:
            world = state.platform
            self.copy_account_to_world(world, address_int)
    
    def will_evm_read_storage_callback(self, state, storage_address, offset):
        # if callback not defined or storage not marked return early
        if self.getStorageCB is None:
            return
        if storage_address not in self.providedStorage:
            return
        
        # if memory is marked or already set (dirty), exit early
        isMemoryDirty = self.providedStorage[storage_address].get(offset, False)
        if isMemoryDirty:
            return

        # Continue with setting memory logic
        self.providedStorage[storage_address][offset] = True # mark as dirty

        # get storage through callback
        storageData = self.getStorageCB(hex(storage_address), hex(offset))

        # set storage
        world = state.platform
        world.set_storage_data(storage_address, offset, hexStringToInt(storageData))

    def will_evm_execute_instruction_callback(self, state, instruct, args):
        # if instruct not call type, exit
        if instruct.semantics not in ["CALL", "DELEGATECALL", "STATICCALL", "BALANCE"]:
            return

        # get address from arguments
        address_int = 0
        if instruct.semantics != "BALANCE":
            address_int = args[1]
        else:
            address_int = args[0]

        # copy account from provider data
        world = state.platform
        self.copy_account_to_world(world, address_int)