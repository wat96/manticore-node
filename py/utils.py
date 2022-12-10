# check if bridge object is a bignumber type
def isBigNumber(num):
    return isinstance(num, dict) and num.get('type') == 'BigNumber'

# ethers hex string to bytes data
def hexStringToBytes(hexStr):
    return bytes.fromhex(hexStr.replace('0x', ''))

# ethers hex string to python number
def hexStringToInt(jsHexString):
    byteRep = hexStringToBytes(jsHexString)
    return int.from_bytes(byteRep, "big")

# ethers BigNumber to python number
def bigNumberToInt(jsNumber):
    return int(jsNumber.toString())

# binary to hex
def binToHex(bin_val):
    return '0x' + bin_val.hex()

def sanitizeJsNum(num):
    res = num
    if isBigNumber(num):
        res = bigNumberToInt(num)
    return res

def sanitizeJsAddr(addr):
    res = addr
    if isinstance(addr, str) and addr.startswith('0x'):
        res = hexStringToInt(addr)
    return res

def sanitizeJsBytes(code):
    res = code
    # do cast if is string with 0x start or empty string
    if isinstance(code, str) and (code.startswith('0x') or len(code.strip()) == 0):
        res = hexStringToBytes(code)
    return res

# mEvm operator functions
def createAccount(mEVM, balance=0, address=None, code=None, name=None, nonce=None):
    adj_bal = sanitizeJsNum(balance)
    adj_addr = sanitizeJsAddr(address)
    adj_code = sanitizeJsBytes(code)

    return mEVM.create_account(adj_bal, adj_addr, adj_code, name, nonce)

def createContract(mEVM, owner, balance=0, address=None, init=None, name=None, gas=None):
    adj_bal = sanitizeJsNum(balance)
    adj_addr = sanitizeJsAddr(address)
    adj_init = sanitizeJsBytes(init)
    adj_gas = sanitizeJsNum(gas)

    return mEVM.create_contract(owner, adj_bal, adj_addr, adj_init, name, adj_gas)

def transaction(mEVM, caller, callee, value, data, gas=None, gasPrice=1):
    adj_caller = sanitizeJsAddr(caller)
    adj_callee = sanitizeJsAddr(callee)
    adj_value = sanitizeJsNum(value)
    adj_data = sanitizeJsBytes(data)
    adj_gas = sanitizeJsNum(gas)
    adj_gasPrice = sanitizeJsNum(gasPrice)
    
    return mEVM.transaction(adj_caller, adj_callee, adj_value, adj_data, gas=adj_gas, price=adj_gasPrice)
