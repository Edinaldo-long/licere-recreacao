<div align="center">

<img src="images/brand/topo-original.jpg" alt="Licere Recreação e Lazer — Mascote golfinho e equipe" width="760" />

# Licere Recreação e Lazer

**Portal institucional completo para serviços de monitoria, eventos, locação de brinquedos, consultoria em lazer e cursos de capacitação em Santos e Litoral Paulista.**

![HTML5](https://img.shields.io/badge/HTML5-Sem%C3%A2ntico-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Responsivo-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111)
![Zero Dependências](https://img.shields.io/badge/Build-Zero_Depend%C3%AAncias-0f6b3a?style=for-the-badge)

[Visitar Repositório](https://github.com/Edinaldo-long/licere-recreacao) · [Reportar Melhoria](https://github.com/Edinaldo-long/licere-recreacao/issues)

</div>

---

## Sobre o Projeto

Este projeto moderniza a presença digital da **Licere Recreação e Lazer**, empresa atuante desde **2007** a partir de **Santos/SP** sob coordenação de **Carmen L. Menezes**, mantendo a identidade original do portal (incluindo o tradicional mascote golfinho com camiseta verde e materiais clássicos para colorir) aliada a uma interface moderna, acessível e responsiva.

O site foi construído inteiramente com tecnologias web padrão (**HTML5**, **CSS3** e **JavaScript puro**), sem necessidade de frameworks ou etapas de compilação (*build*), funcionando tanto via protocolo `file://` quanto em qualquer servidor estático ou **GitHub Pages**.

---

## Páginas e Funcionalidades

| Página | Arquivo | O que oferece |
| :--- | :--- | :--- |
| **Início** | [`index.html`](index.html) | Hero com números e fotos reais, faixa de hotéis/projetos atendidos, proposta sociocultural (*Licere*), 6 cartões de atuação, abas interativas por faixa etária, prévia de galeria com lightbox e atalho para desenhos de colorir. |
| **Quem Somos** | [`sobre.html`](sobre.html) | Conceito sociocultural de lazer, diferenciais operacionais (seleção com psicóloga, professores com CREF, planejamento prévio e Nota Fiscal), currículo e experiências de Carmen L. Menezes e portfólio de clientes. |
| **Serviços & Cursos** | [`servicos.html`](servicos.html) | Seções detalhadas com navegação por âncoras (`#monitoria`, `#brinquedos`, `#eventos`, `#consultoria`, `#cursos`) cobrindo hotelaria, locação de brinquedos, festas/eventos, balões, consultoria e grade de cursos (+27 edições). |
| **Galeria & Colorir** | [`galeria.html`](galeria.html) | Acervo com **39 fotos reais** filtráveis por 6 categorias (`hoteis`, `aquatica`, `eventos`, `brinquedos`, `baloes`, `cursos`), suporte a filtro por URL (`?categoria=...`), lightbox completo e downloads de PDFs para colorir (`#colorir`). |
| **Contato & Trabalhe Conosco** | [`contato.html`](contato.html) | Formulários em abas (**Solicitar Orçamento / Cursos** e **Trabalhe na Licere**, acessíveis diretamente via `?aba=trabalhe` ou `#trabalhe`) que geram resumo pronto para envio por **WhatsApp** ou **E-mail**. |

---

## Destaques Técnicos e de UX

- **JavaScript modular sem dependências (`js/main.js`):**
  - Menu mobile/tablet acessível com fechamento via tecla `Esc` ou clique fora, com atualização automática de `aria-expanded`.
  - Cabeçalho fixo (`sticky`) com redução suave de altura ao rolar (com histerese para evitar oscilações).
  - Sistema reutilizável de abas (`[data-tabs]`) compatível com parâmetros de query string e âncora.
  - Filtro de categorias em tempo real na galeria com contador dinâmico (`aria-live="polite"`).
  - Lightbox acessível para visualização ampliada de imagens com navegação por botões e teclado (`Esc`, `←`, `→`), restaurando o foco ao fechar.
  - Montagem automática de mensagens formatadas (`WhatsApp` e `mailto:`) a partir dos formulários de orçamento e banco de talentos.
- **Sistema visual em CSS puro (`css/style.css`):**
  - Variáveis CSS (`:root`) inspiradas na identidade da marca (verde-esmeralda dos uniformes, azul oceano e amarelo solar).
  - Layout fluido com CSS Grid e Flexbox adaptado para desktop (`>= 1241px`), notebooks (`<= 1240px`), tablets (`<= 1024px`) e smartphones (`<= 560px`).
  - `scroll-padding-top` e `scroll-margin-top` configurados para que links âncora não fiquem encobertos pelo cabeçalho fixo.
  - Suporte a acessibilidade: *skip link* no topo de todas as páginas, `:focus-visible` destacado e respeito a `prefers-reduced-motion`.

---

## Estrutura de Pastas

```text
licere-recreacao/
├── index.html                  # Página inicial
├── sobre.html                  # Quem somos, proposta sociocultural e portfólio
├── servicos.html               # Serviços, locação, consultoria e cursos
├── galeria.html                # Galeria filtrável (39 fotos) e desenhos para colorir
├── contato.html                # Formulários de orçamento e Trabalhe na Licere
├── css/
│   └── style.css               # Folha de estilos principal e regras responsivas
├── js/
│   └── main.js                 # Menu, scroll do header, abas, filtros, lightbox e formulários
├── downloads/
│   ├── colorir-golfinho-licere.pdf
│   └── colorir-pascoa-licere.pdf
└── images/
    ├── logo-mascote.jpg        # Mascote oficial utilizado no cabeçalho, rodapé e favicon
    ├── brand/                  # Imagens institucionais (Carmen, banner original e artes de colorir)
    └── fotos/                  # 39 fotografias reais de hotéis, eventos, brinquedos e cursos
```

---

## Como Executar Localmente

Como o projeto utiliza apenas arquivos estáticos, você pode executá-lo de duas formas:

### Opção 1: Abrir direto no navegador
Basta clonar o repositório e abrir o arquivo `index.html` diretamente no navegador (todos os links relativos funcionam tanto em `file://` quanto em servidor web).

### Opção 2: Rodar com um servidor local (recomendado para desenvolvimento)

```bash
# Clonar o repositório
git clone https://github.com/Edinaldo-long/licere-recreacao.git
cd licere-recreacao
```

Com **Python 3**:
```bash
python -m http.server 5500
```

Ou com **Node.js**:
```bash
npx serve .
```

Depois acesse `http://localhost:5500` (ou a porta exibida no terminal). Também funciona diretamente com a extensão **Live Server** no VS Code.

---

## Publicação no GitHub Pages

1. Acesse o repositório no GitHub em **Settings → Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha a branch `main` e a pasta `/ (root)`, depois clique em **Save**.
4. Em poucos minutos o site estará disponível no endereço público do GitHub Pages.

> **Nota sobre a pasta `downloads/`:** caso use um `.gitignore` padrão que contenha `**/downloads/`, lembre-se de adicionar `!downloads/` antes do commit para que os PDFs de colorir sejam enviados ao repositório e funcionem no site publicado.

---

## Contato Oficial · Licere Recreação e Lazer

- **Coordenação:** Carmen L. Menezes
- **Sede:** Santos/SP — atendimento na Baixada Santista, Litoral Norte/Sul e eventos sob consulta
- **WhatsApp:** [(13) 98114-3431](https://api.whatsapp.com/send?phone=5513981143431)
- **Telefone Fixo:** (13) 3321-3189
- **E-mail:** carmen.licere@yahoo.com.br
- **Facebook:** [facebook.com/licererecreacao](https://www.facebook.com/licererecreacao/)
