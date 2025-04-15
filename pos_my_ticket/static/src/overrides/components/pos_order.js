import { PosOrder } from '@point_of_sale/app/models/pos_order'
import { patch } from '@web/core/utils/patch'

patch(PosOrder.prototype, {
    export_for_printing(baseUrl, headerData) {
        const results = super.export_for_printing(...arguments)

        if (this.get_partner()) {
            results.headerData.partner = this.get_partner()
            console.log('pos_my_ticket', results.headerData.partner)
        }
        return results
    },
})