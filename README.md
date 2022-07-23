# Carteira Digital 🏦

### Bem-vindo a sua mais nova carteira de ações digital!
  Neste aplicativo, é possível visualizar todas as ações pertencentes a corretora, as ações pertencentes ao usuário, comprar e vender ações, entretanto a venda só é permitida a ações que já pertençam ao usuário. Ainda é possível fazer o saque da sua conta digital e depósito.

---

</br>

## Pré Concepções para realização da aplicação:

- Toda a aplicação foi pensada para a melhor usabilidade do usuário;
- Para comprar/vender ações e depositar/sacar dinheiro da conta digital é necessário que o usuário possua um token válido;
- Assim como para entrar nas páginas de Carteira e Negociação de Ações;
- Usuário não pode comprar mais ações do que há presente na corretora nem vender mais ações do que possui;
- Usuário não pode sacar/comprar um valor além do seu saldo disponível;
- No login, deve ser possível a visualização da senha, para visualizar se está correta ou em caso de falha, poder analisar melhor onde está o erro;
- Após o login o email do usuário, sua data e hora locais são salvos no local storage e seu e-mail é inserido como valor do input caso entre novamente na página de login;
- Nas Ações, uma página única com dois botões (abas) para distinção das ações gerais da corretora e as ações pertencentes ao usuário;
- Na lista de ações gerais não é possível vender uma ação já que não é certeza que o usuário possua a ação, evitando fraude;
- Na lista de ações do usuário é possível comprar mais ações daquela empresa ou vender as ações que possui, sejam todas ou apenas algumas ações;
- Cabeçalho dinâmico de forma que o usuário tenha sempre noção do quanto possui na carteira;
- Botões de compra/venda/depósito/saque desabilitados até todas as informações serem preenchidas evitando 'miss click';
- Não é possível comprar/vender 0 ações;
- Página de compra/venda exibida de forma condicional para não confundir o usuário com qual operação ele está realizando;
- Componente de carregamento enquando há resposta da API;

---

</br>

## Instruções de uso:

### Clone:

- Faça o clone da aplicação utilizando:
  - SSH: `git clone git@github.com:Rach-Tairum/desafio-XP-front-end.git`
  - HTTPS: `git clone https://github.com/Rach-Tairum/desafio-XP-front-end.git`
- Entre na pasta: `desafio-xp-front`
- Crie uma nova branch para fazer as alterações que podem ajudar a impulsionar essa aplicação
- Faça a instalação das dependências (`npm install`)

### Inicialização:

- Para rodar localmente o projeto utilize o comando `npm start`
  - O projeto será aberto no link http://localhost:3000 caso essa porta já esteja em uso uma outra será sugerida pelo React para que possa visualizar sem problemas
  
### Possíveis usuários para teste:
(nenhum destes usuários são reais, foram criados somente para demonstração das funcionalidades da aplicação)

- João:
  - email: `joão.xp@teste.com`
  - senha: `euEstiveAqui`

- Maria:
  - email: `maria.xp@teste.com`
  - senha: `euEstiveAquiTambem`

- Guilherme:
  - email: `guilherme.xp@teste.com`
  - senha: `euNaoEstiveAqui`
  
- Marcia:
  - email: `marcia.xp@teste.com`
  - senha: `professoraPort`
  
### Testes:

- Rode o comando `npm test` para visualizar os testes da tela de login

---

</br>

## Link do Deploy da Aplicação

https://desafio-xp-front-end.vercel.app/

</br>

## Visualização da aplicação

https://user-images.githubusercontent.com/93009735/180612873-1a238b7d-aafb-44bd-814b-336ede3d637f.mp4

</br>
</br>

## 

## Link para github da aplicação back-end utilizada

https://github.com/Rach-Tairum/desafio-XP-back
