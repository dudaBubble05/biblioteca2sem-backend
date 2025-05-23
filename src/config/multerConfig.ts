import multer from 'multer'; // Importa o Multer, responsável por lidar com uploads
import path from 'path'; // Módulo para trabalhar com caminhos de arquivos
import crypto from 'crypto'; // Módulo para gerar valores aleatórios

// Define a configuração de armazenamento dos arquivos
const storage = multer.diskStorage({
  // Define o diretório onde os arquivos enviados serão salvos
  destination: (req, file, cb) => {
    cb(null, path.resolve('uploads/cover')); // Caminho absoluto até a pasta "uploads"
  },

  // Define o nome do arquivo que será salvo
  filename: (req, file, cb) => {
    const randomName = crypto.randomBytes(12).toString('base64') // 16 caracteres visuais
    .replace(/[+/=]/g, '') //remove simbolos inválidos
    .substring(0, 16);

    const ext = path.extname(file.originalname); // Extrai a extensão original do arquivo
    cb(null, `${randomName}${ext}`); // Retorna o nome para o multer salvar
  }
});

// Cria o middleware de upload com a configuração de armazenamento definida
export const upload = multer({ storage });

// Define a configuração de armazenamento dos arquivos
const storageCapa = multer.diskStorage({
  // Define o diretório onde os arquivos enviados serão salvos
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads/cover')); // Caminho absoluto até a pasta "uploads"
  },

  // Define o nome do arquivo que será salvo
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extrai a extensão original do arquivo

    // Tenta obter o UUID do usuário da requisição
    const titulo = req.body?.titulo ?? '';
    const editora = req.body?.editora ?? '';

    const sanitize = (texto: string) => texto
      .replace(/[^a-zA-Z0-9-_ ]/g, '') // remove caracteres especiais (exceto espaço, hífen e underscore)
      .replace(/ /g, "_");             // troca espaços por underscores

    const tituloSanitizado = sanitize(titulo);
    const editoraSanitizada = sanitize(editora);

    // Cria o nome final do arquivo: uuid-hash-nomeOriginal.ext
    const filename = `${tituloSanitizado}-${editoraSanitizada}-${file.originalname}`;

    cb(null, filename); // Retorna o nome para o multer salvar
  }
});

// Cria o middleware de upload com a configuração de armazenamento definida
export const uploadCapa = multer({ storage: storageCapa });