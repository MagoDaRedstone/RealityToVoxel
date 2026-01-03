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

- Lê imagem da câmera do navegador
- Também aceita **imagem** e **vídeo** como entrada
- Converte os pixels em um **grid de voxels**
- Usa a **luminância** do pixel pra gerar profundidade
- Renderiza tudo com WebGL 1.0
- Dá pra navegar no espaço 3D tipo FPS
- Dá pra mexer em tudo em tempo real
- As configs ficam salvas no navegador

Não tem backend.  
Tudo acontece localmente.

---

## Controles

### Câmera 3D
- `W / S` → frente / trás  
- `A / D` → esquerda / direita  
- `SPACE` → sobe  
- `SHIFT` → desce  
- Mouse + botão pressionado → gira a câmera  

### Interface
- Grid de voxels
- Tamanho dos cubos
- Profundidade
- Rotação X / Y / Z
- Brilho
- Escala
- Distância da câmera
- Modo foto (congelar frame)
- Upload de imagem
- Upload de vídeo
- Fullscreen 3D
- Salvar configuração

---

## Como os modos realmente funcionam

### Câmera ao vivo

- Usa `getUserMedia`
- A câmera fica **sempre ligada**
- A cada frame:
  - o vídeo é desenhado no canvas 2D
  - os pixels são lidos
  - os voxels são reconstruídos

Não existe pausa real da câmera.
Só existe **ler ou não ler o frame**.

---

### Modo Foto

- Quando ativa:
  - captura **o último frame visível**
  - guarda isso em memória (`ImageData`)
- Enquanto estiver ativo:
  - nenhum frame novo é lido
  - os mesmos pixels são reutilizados
  - os voxels ficam totalmente estáticos

A câmera pode continuar ligada por trás,
mas ela não interfere.

É um freeze lógico, não um pause do stream.

---

### Upload de imagem

- Carrega uma imagem local
- A imagem é desenhada no canvas
- Convertida uma única vez em voxels
- Fica estática até trocar de modo ou imagem

---

### Upload de vídeo

- Carrega um vídeo local
- O vídeo toca em loop
- Pode ser usado como fonte de voxels frame a frame

Se o modo foto estiver desligado:
- o vídeo se comporta como uma câmera

Se o modo foto estiver ligado:
- o último frame é congelado
- o vídeo pode até continuar tocando, mas não é lido

---

## Tecnologias usadas

- HTML5
- JavaScript puro
- WebGL 1.0
- Canvas 2D
- MediaDevices API
- LocalStorage

Nenhuma biblioteca externa.

---

## Estado do projeto

⚠️ Experimental.

Isso **não é**:
- um scanner 3D preciso
- um produto comercial
- uma engine genérica

É um projeto de exploração:
gráficos 3D, percepção visual,
e até onde dá pra forçar WebGL puro no navegador.

---

## Licença

Este projeto usa uma **licença personalizada**.

✔ permitido: estudo, aprendizado, experimentação  
❌ proibido: uso comercial, forks, redistribuição

Leia o arquivo [`LICENCE`](./LICENCE).

---

## Autor

Feito por **MagoDaRedstone** 🧙‍♂️🔥

Projeto independente,
feito por curiosidade, insistência
e vontade de entender o que acontece
quando você transforma pixels em espaço.

---

> Não é sobre copiar o mundo real.  
> É sobre reinterpretar ele em outro formato.
