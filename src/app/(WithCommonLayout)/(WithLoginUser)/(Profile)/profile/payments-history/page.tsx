import { PaymentHistory } from "@/components/modules/(UserModules)/Payment/PaymentHistory";
import { getMyPayments } from "@/services/(UserServices)/PaymentService";



export default async function PaymentHistoryPage() {
  const res = await getMyPayments()
  const payments = res.data
  const meta = res.meta
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-6">Payment History</h1>
      <PaymentHistory payments={payments} meta={meta} />
    </div>
  )
}
