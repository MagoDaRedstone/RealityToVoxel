🧠 RealityToVoxel

RealityToVoxel é um experimento em WebGL puro que transforma vídeo, imagens e câmera ao vivo do mundo real em uma reconstrução 3D voxelizada, diretamente no navegador.

Nada de frameworks.
Nada de engines externas.
Só HTML + JavaScript + WebGL 1.0.

📷🎞️🖼️ Mundo real → 🧊 Voxels → 🌐 Espaço 3D interativo

✨ O que este projeto faz

Captura vídeo da câmera em tempo real

Aceita arquivos de vídeo locais (.mp4, .webm, .avi, etc.)

Aceita imagens locais (.png, .jpg, .jpeg)

Converte cada frame em um grid de voxels 3D

Usa luminância para gerar profundidade

Permite congelar um frame no Modo Foto

Renderiza tudo com WebGL 1.0

Navegação livre em 3D (estilo FPS)

Interface interativa para ajustes ao vivo

Salva configurações localmente (LocalStorage)

Tudo acontece no navegador, sem backend.

📸🎥 Modos de Entrada
📷 Câmera ao vivo

Usa MediaDevices.getUserMedia

Atualização contínua em tempo real

Ideal para exploração dinâmica

🖼️ Foto (Imagem)

Upload de imagens locais

Frame único convertido em voxels

Controle total de profundidade, escala e rotação

🎞️ Vídeo (Arquivo)

Upload de vídeos locais

Leitura frame a frame

Pode ser convertido continuamente ou congelado

🧊 Modo Foto

Congela exatamente o último frame visível

Mantém voxels estáticos

Não pausa a câmera, apenas congela a leitura

🎮 Controles
Movimento da câmera (3D)

W / S → frente / trás

A / D → esquerda / direita

SPACE → sobe

SHIFT → desce

Mouse + clique → rotaciona a câmera

Interface

Ajuste de grid

Tamanho dos voxels

Profundidade baseada em luminância

Brilho

Rotação do objeto (X / Y / Z)

Distância da câmera

Modo 3D Fullscreen

Modo Foto

Botões para enviar imagem ou vídeo

Botão para salvar configuração

🧩 Tecnologias usadas

HTML5

JavaScript (Vanilla)

WebGL 1.0

Canvas 2D (captura de pixels)

MediaDevices API (câmera)

File API (upload de imagens e vídeos)

LocalStorage

❌ Nenhuma biblioteca externa
❌ Nenhum framework
❌ Nenhum backend

🧪 Status do projeto

⚠️ Experimental / Artístico / Pesquisa

Este projeto não tem como objetivo ser:

um scanner físico preciso

um produto comercial

uma engine pronta

Ele existe para exploração criativa, estudo de gráficos 3D
e experimentação com reconstrução visual baseada em dados reais.

🔒 Licença

Este projeto utiliza uma licença personalizada.

✔ Uso permitido para estudo, aprendizado e experimentação
❌ Uso comercial, forks e redistribuição do código não são permitidos

Leia o arquivo LICENCE
 para mais detalhes.

👤 Autor

Criado por MagoDaRedstone 🧙‍♂️🔥

Projeto independente, feito por curiosidade, obsessão técnica
e vontade de dobrar a realidade em voxels.

“Não é sobre copiar o mundo real.
É sobre reinterpretá-lo em outro espaço.”

🧠🧊🌍
