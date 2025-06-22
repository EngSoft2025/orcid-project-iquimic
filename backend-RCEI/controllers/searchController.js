const axios = require('axios');

const searchOrcidProfiles = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Parâmetro "query" é obrigatório' });
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

        // Faz a requisição para o ORCID com o token
        const orcidRes = await axios.get(
            `${process.env.ORCID_API_BASE_URL}/expanded-search/?q=${encodeURIComponent(query)}`,
            {
                headers: {
                    Accept: 'application/vnd.orcid+json',
                    Authorization: `Bearer ${orcidAccessToken}`,
                },
            }
        );

        return res.status(200).json(orcidRes.data);
    } catch (error) {
        console.error('Erro ORCID Search:', error.message);
        return res.status(500).json({
            error: 'Erro ao buscar dados do ORCID',
            details: error.response?.data || error.message,
        });
    }
};

module.exports = {
    searchOrcidProfiles,
};
