import { supabase } from '../../src/supabase/client'; // caminho relativo

export const asaasWebhookHandler = async (req, res) => {
  const { payment_id, status } = req.body;

  try {
    const { error } = await supabase
      .from('orders')
      .update({ payment_status: status })
      .eq('asaas_payment_id', payment_id);

    if (error) {
      res.status(500).json({ message: 'Erro ao atualizar status' });
      return;
    }

    res.status(200).json({ message: 'Status atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao processar webhook', error: err });
  }
};
