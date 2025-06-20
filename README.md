# Apresentação do Projeto ORCID

## Integrantes do Grupo
- Tiago Chaves Bezerra Rocha - 14609637
- Felipe da Costa Coqueiro - 11781361
- Gustavo de Araújo Poffo - 13672849

---

## Introdução e Contextualização
ORCID (Open Researcher and Contributor ID) é um identificador digital único para pesquisadores e autores acadêmicos. Ele resolve a ambiguidade nos nomes, garantindo um ID exclusivo para cada pesquisador.  
Facilita o reconhecimento das contribuições científicas, integra dados de publicações e afiliações de forma segura e padronizada.

---

## Motivação e Objetivos
- Melhorar a usabilidade da plataforma ORCID, criando soluções inovadoras baseadas em sua API pública.
- Entrevistar 3 professores para coleta de requisitos.
- Desenvolver um produto (web, mobile ou desktop) que facilite a interação com dados do ORCID.

---

## Diagramas do Projeto

### Diagrama de Casos de Uso  
_Descrição:_ Funcionalidades e atores principais do sistema.  
![Diagrama de Casos de Uso](./Documents/diagrama_casosDeUso.png)  

### Diagrama de Classes  
_Descrição:_ Entidades, atributos e relacionamentos do sistema.  
![Diagrama de Classes](./Documents/diagrama_classes.png)  

### Diagrama de Atividades  
_Descrição:_ Fluxo de trabalho e decisões no sistema.  
![Diagrama de Atividades](./Documents/diagrama_atividades.png)  

### Diagrama de Estados  
_Descrição:_ Estados possíveis de um objeto e transições.  
![Diagrama de Estados](./Documents/diagrama_estados.png)  

### Diagrama de Componentes  
_Descrição:_ Componentes principais do sistema e suas interações.  
![Diagrama de Componentes](./Documents/diagrama_componentes.png)  

### Diagrama de Implantação  
_Descrição:_ Arquitetura física e comunicação entre dispositivos.  
![Diagrama de Implantação](./Documents/diagrama_implantacao.png)  

---

## Protótipo Interativo  
Confira o protótipo interativo no Figma:  
[Link para o protótipo no Figma](https://www.figma.com/design/zdev5naDktoL9UD3H1XAqw/RCEI-Versao-1.0.0?node-id=1-4&t=VZS7WbodEZNPjjQg-0)

---

## Executando o Projeto

Este projeto foi desenvolvido utilizando React com TypeScript.  Siga as instruções abaixo para executá-lo localmente:

### Pré-requisitos

Certifique-se de ter o Node.js e o npm (ou yarn) instalados em seu sistema.  Você pode verificar se já os tem, executando os seguintes comandos no terminal:

```bash
node -v
npm -v  # Ou yarn -v se preferir yarn
```

Se não tiver o Node.js instalado, você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).  A instalação do Node.js geralmente inclui o npm.

### Passos para Executar

1.  **Clone o repositório:**

    ```bash
    git clone [URL do seu repositório]
    cd Frontend-RCEI
    ```

2.  **Instale as dependências:**

    ```bash
    npm install  # Ou yarn install
    ```
    Este comando irá instalar todas as dependências listadas no arquivo `package.json`.

3.  **Configure as variáveis de ambiente (se necessário):**

    Se o projeto utilizar variáveis de ambiente (por exemplo, chaves de API), crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias.  Exemplo:

    ```
    REACT_APP_API_KEY=sua_chave_api
    ```

    Certifique-se de que este arquivo esteja adicionado ao `.gitignore` para evitar o commit de informações sensíveis.

4.  **Execute o projeto:**

    ```bash
    npm start  # Ou yarn start
    ```

    Este comando irá iniciar o servidor de desenvolvimento do React.  Normalmente, o projeto estará disponível em `http://localhost:3000`.

### Outros Comandos Úteis

*   **Build para produção:**

    ```bash
    npm run build  # Ou yarn build
    ```
    Este comando criará uma versão otimizada do projeto para produção na pasta `build`.

*   **Executar testes:**

    ```bash
    npm test  # Ou yarn test
    ```

*   **Executar o linter:**

    ```bash
    npm run lint  # Ou yarn lint (se você tiver um script "lint" definido no package.json)
    ```

### Notas Adicionais

*   Certifique-se de que as configurações em `vite.config.ts`, `tailwind.config.ts`, `tsconfig.json`, etc., estejam corretas para o seu ambiente.
*   Se você tiver problemas com dependências, tente limpar o cache do npm/yarn:

    ```bash
    npm cache clean --force  # Ou yarn cache clean
    rm -rf node_modules  # Remova a pasta node_modules
    npm install  # Ou yarn install novamente
    ```

*   Consulte a documentação do Create React App (ou Vite, dependendo de como o projeto foi criado) para obter informações adicionais sobre configuração e deployment: [https://create-react-app.dev/](https://create-react-app.dev/) (se Create React App) ou [https://vitejs.dev/](https://vitejs.dev/) (se Vite).


## Configuração da API ORCID

Para habilitar o login via ORCID no **frontend-RCEI**, é preciso registrar um cliente em [Developer Tools](https://orcid.org/developer-tools). A inscrição gratuita fornece um *Client ID* e permite definir as URLs de redirecionamento utilizadas durante a autenticação.

Copie o arquivo de exemplo e crie um `.env` na pasta `frontend-RCEI`:

```bash
cp frontend-RCEI/.env.example frontend-RCEI/.env
```

Preencha o arquivo com:

```bash
VITE_ORCID_CLIENT_ID=<seu_client_id>
VITE_ORCID_REDIRECT_URI=http://localhost:8080/auth/callback
```

Essas variáveis são utilizadas pelo `frontend-RCEI` durante o desenvolvimento local.

### Escopos ORCID

Para realizar o login e consultar publicações, financiamentos e revisões de pares,
solicite o escopo `/authenticate` juntamente com `/read-public`.
Se precisar acessar informações restritas do perfil inclua também o escopo
`/read-limited`.
