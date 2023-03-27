import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';

export const getPrinterCommands: any = async (params: any) => {
	let invoiceRes = await axiosInstance.get('/invoice', { params });
  if(!invoiceRes.data.docs.length)
    return null;
  let invoiceId = invoiceRes.data.docs[0].id;
  let commandsRes = await axiosInstance.get('/invoice/commands', { 
    params: {
      orderId: params.orderId,
      invoiceId,
      type: 'Invoice'
    }
  });
  let response = await fetch('http://localhost:4000/print', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: commandsRes.data,
      printer: 'cashier_printer'
    })
  })
  let json = await response.json();
  return json;
};

type QueryFnType = typeof getPrinterCommands;

interface UseGetPrinterCommandsOptions {
	config?: QueryConfig<QueryFnType>;
	params?: any;
}

export const useGetPrinterCommands = ({ config, params }: UseGetPrinterCommandsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-printer-commands', params],
		queryFn: async () => getPrinterCommands(params),
		...config,
	});
};
