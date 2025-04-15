import { patch } from '@web/core/utils/patch'
import { _t } from '@web/core/l10n/translation'
import { AlertDialog } from '@web/core/confirmation_dialog/confirmation_dialog'
import { PaymentScreen } from '@point_of_sale/app/screens/payment_screen/payment_screen'


patch(PaymentScreen.prototype, {
    /**
     * Overrides `validateOrder` method to make the customer mandatory.
     * @param {boolean} isForceValidate 
     * @returns {Promise<boolean>} 
     */
    async validateOrder(isForceValidate) {
        console.log('inherit validateOrder()')
        const order = this.currentOrder
        console.log('order', order)

        if (order.get_partner() === undefined) {
            console.log('order.get_partner() === undefined')
            this.env.services.dialog.add(AlertDialog, {
                title: _t("Error"), body: _t("The customer is mandatory."),
            })

            return false
        }

        return await super.validateOrder(...arguments)
    },
    /**
     * Overrides `shouldDownloadInvoice` method to never downloading invoice.
     * @returns {boolean}
     */
    shouldDownloadInvoice() {
        console.log('inherit shouldDownloadInvoice()')
        return false
    }
})