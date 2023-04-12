# Receitas App
Este é um aplicativo de receitas desenvolvido com React e Node.js. Ele permite que os usuários visualizem receitas e salvem suas receitas favoritas.

## Configuração
Para rodar o aplicativo, é necessário ter o Node.js instalado em seu computador. Siga as instruções abaixo para configurar o aplicativo:

Clone este repositório em sua máquina local.
Navegue para o diretório principal do aplicativo.
Abra um terminal e execute o comando npm install para instalar as dependências.
Execute o comando npm start para iniciar o aplicativo.
O aplicativo consiste em dois componentes principais: Home e SavedRecipes. O componente Home exibe todas as receitas disponíveis e permite que os usuários salvem suas receitas favoritas. O componente SavedRecipes exibe as receitas salvas pelo usuário.

O aplicativo utiliza a biblioteca axios para fazer requisições HTTP e a biblioteca react-cookie para gerenciar cookies.

## Componentes
### Home
O componente Home é responsável por exibir todas as receitas disponíveis e permitir que os usuários salvem suas receitas favoritas. Ele possui as seguintes funcionalidades:

Mostra uma lista de receitas com seu nome, instruções, imagem e tempo de cozimento.
Permite que o usuário salve uma receita clicando no botão "Salvar".
Desabilita o botão "Salvar" para receitas já salvas pelo usuário.
Salva as receitas favoritas do usuário no banco de dados.

## SavedRecipes
O componente SavedRecipes é responsável por exibir as receitas salvas pelo usuário. Ele possui as seguintes funcionalidades:

Mostra uma lista de receitas salvas com seu nome, instruções, imagem e tempo de cozimento.
Não permite que o usuário salve uma receita nesta tela.

## Hooks
useGetUserID
O hook useGetUserID é responsável por buscar o ID do usuário armazenado no armazenamento local. Ele é utilizado em vários componentes para identificar o usuário atual.

## APIs
O aplicativo utiliza uma API RESTful desenvolvida em Node.js. A API possui os seguintes endpoints:

GET /recipes: Retorna uma lista de todas as receitas disponíveis.
GET /savedRecipes/:userID: Retorna uma lista de todas as receitas salvas pelo usuário com o ID especificado.
GET /savedRecipes/ids/:userID: Retorna uma lista com os IDs de todas as receitas salvas pelo usuário com o ID especificado.
PUT /recipes: Salva uma receita favorita do usuário no banco de dados.
