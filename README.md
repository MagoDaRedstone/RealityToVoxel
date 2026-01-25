<p align="center">
  <a href="https://magodaredstone.github.io/RealityToVoxel/" target="_blank">
    <img src="https://img.shields.io/badge/RealityToVoxel-GitHub%20Pages-0aa0ff?style=for-the-badge&logo=github" />
  </a>
</p>

# RealityToVoxel 🧠🧊

RealityToVoxel é um experimento pessoal em **WebGL puro**.

A ideia é simples:
pegar imagem do mundo real (câmera, imagem ou vídeo)
e reinterpretar isso como um **objeto 3D voxelizado**, em tempo real,
direto no navegador.

Sem framework.  
Sem engine.  
Sem biblioteca externa.

Só **HTML + JavaScript + WebGL 1.0**.

---

## O que isso faz, na prática

- Lê imagem da câmera do navegador via `getUserMedia`
- Também aceita **imagem** e **vídeo** local como entrada
- Converte os pixels em um **grid de voxels** ou **mesh**
- Usa a **luminância** do pixel pra gerar profundidade no eixo Z
- Renderiza tudo com WebGL 1.0 (Buffers de Vértices e Cores)
- Dá pra navegar no espaço 3D tipo FPS com matrizes de visão
- As configs ficam salvas no navegador via `localStorage`

Não tem backend.  
Tudo acontece localmente na GPU.

---

## Controles e Interface

### Navegação 3D
- `W / S` → frente / trás  
- `A / D` → esquerda / direita  
- `SPACE` → sobe  
- `SHIFT` → desce  
- Mouse + botão pressionado → gira a câmera (Pitch/Yaw)

### Sistema de Modos
- **MODOS (`toggleMode`)** → Alterna entre o feed da **câmera ao vivo** e o painel de **upload** (para injetar seus próprios vídeos ou fotos).
- **mesh/cube (`toggleMesh`)** → Muda a geometria em tempo real. Você escolhe entre ver cubos sólidos individuais (**Voxel**) ou uma malha de superfície conectada (**Mesh**).
- **FOTO** → Congela o frame atual e gera uma captura estática pra você rotacionar e analisar o 3D sem o vídeo mudar os vértices.

### Sliders de Ajuste
- **Grid Size** → Resolução da amostragem de pixels.
- **Depth** → Intensidade do relevo no eixo Z.
- **Cubo Size** → Tamanho das primitivas 3D.
- **Brightness** → Ganho de cor nos Shaders.
- **Rotation X/Y/Z** → Manipulação da matriz de modelo do objeto.

---

## Como funciona o sistema

### Renderização (WebGL)
O motor não usa bibliotecas de terceiros. Toda a matemática de matrizes (`mat4`) está no `object.js`. O sistema compila os Shaders em tempo real e atualiza os buffers de vértices conforme o brilho da imagem captada.

### Processamento de Frame
- O vídeo/imagem é desenhado num canvas 2D oculto.
- O sistema lê o `ImageData` (RGBA).
- A cada ciclo, os vértices são recalculados: Pixels mais claros ficam "mais altos" (Z positivo), pixels escuros ficam "mais baixos".

---

## Arquivos do Projeto

- `main.js` → Loop de renderização e lógica da câmera FPS.
- `object.js` → Biblioteca de matrizes e definições de geometria (Cubo/Mesh).
- `scan.js` → Inicialização do WebGL e compilação de Shaders.
- `listern.js` → Gerenciador de eventos de teclado, mouse e interface.

---

## Estado do projeto

⚠️ Experimental.

Isso **não é**:
- um scanner 3D de alta precisão
- um produto comercial
- uma engine genérica

É um projeto de exploração: gráficos 3D de baixo nível, performance de buffers e manipulação de matrizes no navegador.

---

## Licença

Este projeto usa uma **licença personalizada**.

✔ permitido: estudo, aprendizado, experimentação  
❌ proibido: uso comercial, forks públicos, redistribuição

Leia o arquivo [`LICENCE`](./LICENCE).

---

## Autor

Feito por **MagoDaRedstone** 🧙‍♂️🔥

---

> Não é sobre copiar o mundo real.  
> É sobre reinterpretar ele em outro formato.
