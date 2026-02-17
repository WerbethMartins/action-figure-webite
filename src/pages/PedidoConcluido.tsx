import { useLocation, useNavigate } from "react-router-dom";

function PedidoConcluido(){
    const navigate = useNavigate();
    const location = useLocation();

    // Dados do pedido enviado via navigate
    const pedido = location.state?.pedido;

    return(
        <div className="order-container">
            <div className="order-card">
                <div className="card-header">
                    <h1 className="title">Resumo do Pedido</h1>
                    <p className="sub-title">Seu pedido foi realizado com sucesso.</p>
                </div>

                {pedido  && (
                    <div className="order-summary">
                        <p><strong>Data:</strong> {new Date(pedido.data).toLocaleString()}</p>
                        <p><strong>Itens:</strong> {pedido.itens.length}</p>
                        <p><strong>Subtotal:</strong> R$ {pedido.subTotal.toFixed(2)}</p>

                        {pedido.desconto > 0 && (
                            <p><strong>Desconto:</strong> -R$ {pedido.desconto.toFixed(2)}</p>
                        )}

                        <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>

                        <p>
                            <strong>Pagamento:</strong> {pedido.parcelas}x de R$ {pedido.valorParcela.toFixed(2)}
                        </p>
                    </div>
                )}

                <button onClick={() => navigate("/")}>
                    Voltar para produtos
                </button>
            </div>
        </div>
    );
}

export default PedidoConcluido;