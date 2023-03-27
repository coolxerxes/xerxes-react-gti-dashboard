import { useAppSelector } from 'redux/hooks';
import { usePostOrderPreview } from '../api/postOrderPreview';

interface Props {
	cartSummay: {
		discount: number;
		headerDiscount: number;
		totalBeforeDiscount: number;
		totalPaid: number;
		totalRefunded: number;
		totalTax: number;
		totalTaxableAmount: number;
		totalWithTax: number;
	};
}

const CartSummary = ({ cartSummay }: Props) => {
	const cartItems = useAppSelector((state) => state.data.cartReducer.items);

	const postOrderPreview = usePostOrderPreview();

	return (
		<>
			{cartSummay && (
				<div className='mt-4 flex grow flex-col justify-end pb-2.5'>
					<div className='flex flex-col gap-y-2.5'>
						<span
							className={`text-[17px] font-normal capitalize text-[#ABA5A2] text-left`}
						>
							Vat Included
						</span>

						<div
							className={`flex w-full justify-between text-[17px] font-normal text-[#393230]`}
						>
							<span>Subtotal</span>
							<span>
								{cartSummay.totalTaxableAmount - cartSummay.headerDiscount} SAR
							</span>
						</div>
						{cartSummay.headerDiscount > 0 && (
							<div
								className={`flex w-full justify-between text-[17px] font-normal text-[#393230]`}
							>
								<span>Discount</span>
								<span className='text-primary'>
									{cartSummay.headerDiscount} SAR
								</span>
							</div>
						)}

						{cartSummay.headerDiscount > 0 && (
							<div
								className={`flex w-full justify-between text-[17px] font-normal text-[#393230]`}
							>
								<span>Subtotal After Discount</span>
								<span>{cartSummay.totalTaxableAmount} SAR</span>
							</div>
						)}

						<div
							className={`flex  w-full justify-between text-[17px] font-normal text-[#393230]`}
						>
							<span>Tax</span>
							<span>{cartSummay.totalTax} SAR</span>
						</div>

						<hr className='my-2.5 border border-dashed border-[#E2E2E2]'></hr>
						<div
							className={`flex w-full justify-between text-[17px] font-bold text-[#393230]`}
						>
							<span>Total</span>
							<span>{cartSummay.totalWithTax} SAR</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CartSummary;
