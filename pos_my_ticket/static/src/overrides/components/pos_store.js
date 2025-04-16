import { patch } from '@web/core/utils/patch'
import { PosStore } from '@point_of_sale/app/store/pos_store'
import { OrderReceipt } from "@point_of_sale/app/screens/receipt_screen/receipt/order_receipt";

patch(PosStore.prototype, {
    async printReceipt({
        basic = false,
        order = this.get_order(),
        printBillActionTriggered = false,
    } = {}) {
        const data = this.orderExportForPrinting(order)
        console.log('inherit printReceipt()', order)
        console.log('URL print', this.config.epson_printer_ip)
        console.log('data', data.headerData.company)

        try {
            await fetch(`${this.config.epson_printer_ip}/ping`)
        } catch (error) {

            await this.printer.print(
                OrderReceipt,
                {
                    data,
                    formatCurrency: this.env.utils.formatCurrency,
                    basic_receipt: basic,
                },
                { webPrintFallback: true }
            )
        }

        return true
    }
})