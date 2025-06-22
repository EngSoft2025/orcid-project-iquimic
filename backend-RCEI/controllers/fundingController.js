const axios = require('axios');

const getOrcidFundings = async (req, res) => {
    const { orcidId } = req.query;

    if (!orcidId) {
        return res.status(400).json({ error: 'Parâmetro "orcidId" é obrigatório' });
    }

    try {
        // Obtém o token com escopo read-public
        const tokenRes = await axios.post('https://orcid.org/oauth/token', null, {
            params: {
                client_id: process.env.ORCID_CLIENT_ID,
                client_secret: process.env.ORCID_CLIENT_SECRET,
                grant_type: 'client_credentials',
                scope: '/read-public',
            },
            headers: {
                Accept: 'application/json',
            },
        });

        const orcidAccessToken = tokenRes.data.access_token;

        if (!orcidAccessToken) {
            return res.status(500).json({ error: 'Falha ao obter token ORCID' });
        }

        // Faz a requisição para a API ORCID para obter fundings
        const response = await axios.get(
            `${process.env.ORCID_API_BASE_URL || 'https://pub.orcid.org/v3.0'}/${orcidId}/funding`,
            {
                headers: {
                    Accept: 'application/vnd.orcid+json',
                    Authorization: `Bearer ${orcidAccessToken}`,
                },
            }
        );

        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Erro ao buscar projetos ORCID:', error.message);
        return res.status(500).json({
            error: 'Erro ao buscar projetos do ORCID',
            details: error.response?.data || error.message,
        });
    }
};

module.exports = {
    getOrcidFundings,
};
