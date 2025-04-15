import { patch } from '@web/core/utils/patch'
import { PosStore } from '@point_of_sale/app/store/pos_store'

patch(PosStore.prototype, {
    async printReceipt({
        basic = false,
        order = this.get_order(),
        printBillActionTriggered = false,
    } = {}) {
        console.log('inherit printReceipt()', order)
        console.log('URL print', this.config.epson_printer_ip)
        return true
    }
})