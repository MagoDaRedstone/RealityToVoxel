# 🧠 RealityToVoxel

**RealityToVoxel** é um experimento em **WebGL puro** que transforma imagens da câmera do mundo real em uma **reconstrução 3D voxelizada em tempo real**, diretamente no navegador.

Nada de frameworks.
Nada de engines externas.
Só **HTML + JavaScript + WebGL 1.0**.

> 📷 Mundo real → 🧊 Voxels → 🌐 Espaço 3D interativo

---

## ✨ O que este projeto faz

- Captura vídeo da câmera em tempo real
- Converte a imagem em um **grid de voxels 3D**
- Usa **luminância** para gerar profundidade
- Renderiza tudo com **WebGL 1.0**
- Permite navegação livre em 3D (estilo FPS)
- Interface interativa para ajustes ao vivo
- Salva configurações localmente (LocalStorage)

Tudo acontece **no navegador**, sem backend.

---

## 🎮 Controles

### Movimento da câmera (3D)
- `W` / `S` → frente / trás
- `A` / `D` → esquerda / direita
- `SPACE` → sobe
- `SHIFT` → desce
- Mouse + clique → rotaciona a câmera

### Interface
- Ajuste de **grid**, **tamanho dos voxels**, **profundidade**, **brilho**
- Rotação do objeto nos eixos X / Y / Z
- Zoom da câmera
- Modo **3D Fullscreen**
- Botão para salvar configuração

---

## 🧩 Tecnologias usadas

- HTML5
- JavaScript (vanilla)
- WebGL 1.0
- Canvas 2D (captura de pixels)
- MediaDevices API (câmera)
- LocalStorage

Sem bibliotecas externas.

---

## 🧪 Status do projeto

⚠️ **Experimental / Artístico / Pesquisa**

Este projeto não tem como objetivo ser:
- um scanner físico preciso
- um produto comercial
- uma engine pronta

Ele existe para **exploração criativa**, estudo de gráficos 3D e experimentação com reconstrução visual.

---

## 🔒 Licença

Este projeto utiliza uma **licença personalizada**.

✔ Uso permitido para estudo, aprendizado e experimentação
❌ Uso comercial, forks e redistribuição do código **não são permitidos**

Leia o arquivo [`LICENCE`](./LICENCE) para mais detalhes.

---

## 👤 Autor

Criado por **MagoDaRedstone** 🧙‍♂️🔥

Projeto independente, feito por curiosidade, obsessão técnica
e vontade de dobrar a realidade em voxels.

---

> “Não é sobre copiar o mundo real.
> É sobre reinterpretá-lo em outro espaço.”

🧠🧊🌍
