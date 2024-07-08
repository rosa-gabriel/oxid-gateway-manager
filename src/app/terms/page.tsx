import { Box, Button, Paper } from "@mui/material";
import { redirect } from "next/navigation";

export default function Page() {

    return (
        <Box height={"100vh"} sx={{ backgroundColor: "#F36D00", position: "relative", p: 10 }}>
            <Paper sx={{ p: 2 }}>
                <h2>Termo de Aceite para Utilização do API Gateway</h2>
                <p>
                    Eu, como usuário,
                    ao utilizar o Oxid Gateway , operado por Gabriel LLC, doravante denominada {'"'}Empresa{'"'}, concordo com os seguintes termos:
                </p>
                <ol>
                    <li>
                        <strong>Finalidade do Tratamento de Dados:</strong> O API Gateway é
                        utilizado para gerenciar o acesso e a segurança das APIs da Empresa.
                        Os dados fornecidos serão utilizados exclusivamente para essa finalidade.
                    </li>
                    <li>
                        <strong>Dados Coletados e Tratados:</strong>
                        <ul>
                            <li>Informações do OAuth compartilhado do Keycloak.</li>
                            <li>Endereço IP do Usuário.</li>
                            <li>Login e Senha.</li>
                        </ul>
                        <p>
                            Esses dados são utilizados para autenticação, autorização e segurança
                            do acesso às APIs da Empresa.
                        </p>
                    </li>
                    <li>
                        <strong>Base Legal para Tratamento:</strong> A Empresa tratará os dados
                        com base no consentimento do Usuário, conforme previsto no artigo 7º da
                        LGPD.
                    </li>
                    <li>
                        <strong>Compartilhamento de Dados:</strong> Os dados coletados poderão
                        ser compartilhados com prestadores de serviços contratados pela Empresa,
                        exclusivamente para operação e manutenção do API Gateway.
                    </li>
                    <li>
                        <strong>Segurança dos Dados:</strong> A Empresa adota medidas de
                        segurança técnicas e organizacionais adequadas para proteger os dados
                        pessoais contra acessos não autorizados e situações de risco.
                    </li>
                    <li>
                        <strong>Direitos do Titular dos Dados:</strong> O Usuário possui direitos
                        garantidos pela LGPD, incluindo o direito de acessar seus dados,
                        corrigi-los, eliminar ou revogar seu consentimento para o tratamento,
                        mediante solicitação à Empresa.
                    </li>
                    <li>
                        <strong>Consentimento:</strong> Ao utilizar o API Gateway, o Usuário
                        consente com a coleta, uso, armazenamento e tratamento de seus dados
                        pessoais conforme descrito neste termo.
                    </li>
                    <li>
                        <strong>Atualizações do Termo:</strong> Este termo poderá ser atualizado
                        pela Empresa a qualquer momento, sendo que versões atualizadas estarão
                        disponíveis para consulta.
                    </li>
                </ol>
                <p>
                    Ao aceitar este termo, declaro que li, compreendi e concordo com as
                    condições descritas acima.
                </p>
                <form
                    style={{
                        width: "100%"
                    }}
                    action={async () => {
                        "use server"
                        redirect("/login")
                    }}
                >
                    <Button fullWidth type="submit">Confirm</Button>
                </form>
            </Paper>
        </Box>
    )
}
