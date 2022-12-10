from manticore.core.plugin import Plugin

class BasePlugin(Plugin):
    CBs = {}
    # func for registering callback
    def register_cb(self, cb_name, cb):
        self.CBs[cb_name] = cb

    def call_callback(self, func_name, args):
        cb = self.CBs.get(func_name, None)
        res = None
        if cb is not None: res = cb(*args)
        return res

    # Base plugin with only function stubs
    # Core stubs
    def will_fork_state_callback(self, *args):
        return self.call_callback('will_fork_state_callback', args)

    def did_fork_state_callback(self, *args):
        return self.call_callback('did_fork_state_callback', args)

    def will_load_state_callback(self, *args):
        return self.call_callback('will_load_state_callback', args)

    def did_load_state_callback(self, *args):
        return self.call_callback('did_load_state_callback', args)

    def will_run_callback(self, *args):
        return self.call_callback('will_run_callback', args)

    def did_run_callback(self, *args):
        return self.call_callback('did_run_callback', args)


    # Worker stubs
    def will_start_worker_callback(self, *args):
        return self.call_callback('will_start_worker_callback', args)

    def will_terminate_state_callback(self, *args):
        return self.call_callback('will_terminate_state_callback', args)

    def did_terminate_state_callback(self, *args):
        return self.call_callback('did_terminate_state_callback', args)

    def will_kill_state_callback(self, *args):
        return self.call_callback('will_kill_state_callback', args)

    def did_kill_state_callback(self, *args):
        return self.call_callback('did_kill_state_callback', args)

    def did_terminate_worker_callback(self, *args):
        return self.call_callback('did_terminate_worker_callback', args)


    # EVM stubs
    def will_decode_instruction_callback(self, *args):
        return self.call_callback('will_decode_instruction_callback', args)

    def will_evm_execute_instruction_callback(self, *args):
        return self.call_callback('will_evm_execute_instruction_callback', args)

    def did_evm_execute_instruction_callback(self, *args):
        return self.call_callback('did_evm_execute_instruction_callback', args)

    def did_evm_read_memory_callback(self, *args):
        return self.call_callback('did_evm_read_memory_callback', args)

    def did_evm_write_memory_callback(self, *args):
        return self.call_callback('did_evm_write_memory_callback', args)

    def on_symbolic_sha3_callback(self, *args):
        return self.call_callback('on_symbolic_sha3_callback', args)

    def on_concreate_sha3_callback(self, *args):
        return self.call_callback('on_concreate_sha3_callback', args)

    def did_evm_read_code_callback(self, *args):
        return self.call_callback('did_evm_read_code_callback', args)

    def will_evm_read_storage_callback(self, *args):
        return self.call_callback('will_evm_read_storage_callback', args)

    def did_evm_read_storage_callback(self, *args):
        return self.call_callback('did_evm_read_storage_callback', args)

    def will_evm_write_storage_callback(self, *args):
        return self.call_callback('will_evm_write_storage_callback', args)

    def did_evm_write_storage_callback(self, *args):
        return self.call_callback('did_evm_write_storage_callback', args)

    def will_open_transaction_callback(self, *args):
        return self.call_callback('will_open_transaction_callback', args)

    def did_open_transaction_callback(self, *args):
        return self.call_callback('did_open_transaction_callback', args)

    def will_close_transaction_callback(self, *args):
        return self.call_callback('will_close_transaction_callback', args)

    def did_close_transaction_callback(self, *args):
        return self.call_callback('did_close_transaction_callback', args)