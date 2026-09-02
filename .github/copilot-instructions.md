## Git — Commits e Push

Quando eu solicitar que você faça o commit e o push das alterações:

1. Adicione ao stage somente os arquivos relacionados às alterações realizadas.
2. Crie uma mensagem de commit clara e seguindo Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, etc.).
3. Faça o commit usando essa mensagem.
4. O commit deve incluir o GitHub Copilot como coautor através do trailer:

Co-authored-by: GitHub Copilot [198982749+Copilot@users.noreply.github.com](mailto:198982749+Copilot@users.noreply.github.com)

5. Depois do commit, execute o `git push` para a branch atual.
6. Não altere o autor principal do commit. O autor principal deve continuar sendo o usuário configurado no Git.
7. Nunca faça `git commit --amend` ou altere commits anteriores sem minha solicitação explícita.
8. Após concluir, informe resumidamente:
   - arquivos adicionados ao stage;
   - mensagem do commit;
   - confirmação de que o Copilot foi incluído como coautor;
   - branch e resultado do push.

Exemplo do commit esperado:

feat: atualiza layout e integra dependências do projeto

Co-authored-by: GitHub Copilot [198982749+Copilot@users.noreply.github.com](mailto:198982749+Copilot@users.noreply.github.com)
