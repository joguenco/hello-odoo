import { AccountMoveService } from '@account/services/account_move_service'
import { patch } from '@web/core/utils/patch'

patch(AccountMoveService.prototype, {
  getInvoice (invoiceId) {
    return this.orm.searchRead('account.move', [
      ['id', '=', invoiceId]],
    ['id', 'name', 'display_name', 'move_type', 'state', 'partner_id', 'invoice_date']
    )
    // return all fields
    // return this.orm.searchRead("account.move", [
    //     ["id", "=", invoiceId],
    // ])
  }
})
