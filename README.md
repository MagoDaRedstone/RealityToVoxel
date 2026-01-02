# RealityToVoxel

**RealityToVoxel** é um experimento em **WebGL puro** que transforma **câmera, vídeos e imagens** do mundo real em uma **reconstrução 3D voxelizada**, diretamente no navegador.

Sem frameworks.  
Sem engines externas.  
Apenas **HTML + JavaScript + WebGL 1.0**.

---

## O que este projeto faz

- Captura vídeo da câmera em tempo real
- Suporta upload de **vídeos locais** (`.mp4`, `.webm`, `.avi`)
- Suporta upload de **imagens locais** (`.png`, `.jpg`, `.jpeg`)
- Converte pixels em um **grid de voxels 3D**
- Usa **luminância** para gerar profundidade
- Permite congelar um frame no **Modo Foto**
- Renderiza tudo com **WebGL 1.0**
- Navegação livre em 3D (estilo FPS)
- Interface interativa para ajustes em tempo real
- Salva configurações via **LocalStorage**

Tudo roda **100% no navegador**, sem backend.

---

## Modos de Entrada

### Câmera ao vivo
- Captura contínua usando `MediaDevices.getUserMedia`
- Atualização em tempo real

### Foto (Imagem)
- Upload de imagem local
- Um único frame convertido em voxels

### Vídeo (Arquivo)
- Upload de vídeo local
- Leitura frame a frame
- Pode ser usado em tempo real ou congelado

### Modo Foto
- Congela exatamente o **último frame visível**
- Mantém os voxels estáticos
- Não pausa a câmera, apenas congela a leitura

---

## Controles

### Movimento da câmera (3D)
- `W` / `S` → frente / trás
- `A` / `D` → esquerda / direita
- `SPACE` → subir
- `SHIFT` → descer
- Mouse + clique → rotacionar câmera

### Interface
- Tamanho do grid
- Tamanho dos voxels
- Profundidade
- Brilho
- Rotação nos eixos X / Y / Z
- Distância da câmera
- Modo 3D fullscreen
- Modo foto
- Upload de imagem e vídeo
- Salvar configuração

---

## Tecnologias utilizadas

- HTML5
- JavaScript (Vanilla)
- WebGL 1.0
- Canvas 2D
- MediaDevices API
- File API
- LocalStorage

Nenhuma biblioteca externa é utilizada.

---

## Status do projeto

**Experimental / Artístico / Pesquisa**

Este projeto não tem como objetivo ser:
- um scanner físico preciso
- um produto comercial
- uma engine pronta

Ele existe para exploração criativa, estudo de gráficos 3D
e experimentação com reconstrução visual.

---

## Licença

Este projeto utiliza uma **licença personalizada**.

- Uso permitido para estudo e aprendizado
- Uso comercial, forks e redistribuição **não são permitidos**

Leia o arquivo [`LICENCE`](./LICENCE) para mais detalhes.

---

## Autor

Criado por **MagoDaRedstone**

Projeto independente, feito por curiosidade técnica
e exploração de reconstrução visual em voxels.
