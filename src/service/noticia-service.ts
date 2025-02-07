import axios from 'axios';

const URL_API = 'http://localhost:5000/noticias';

interface NoticiasPaginadas {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    data: NoticiaProps[]
}

interface NoticiaProps {
    id: string;
    titulo: string;
    descricao: string;
}

class NoticiaService {
  static async buscarNoticiasPaginadas(page: number, limit: number): Promise<NoticiasPaginadas> {
    try {
      const resposta = await axios.get(`${URL_API}/paginadas`, {
        params: {
          page,
          limit,
        },
      });
      return resposta.data;
    } catch (erro) {
      console.error('Erro ao buscar notícias:', erro);
      throw erro;
    }
  }

  static async salvarNoticia(noticia: NoticiaProps): Promise<NoticiaProps> {
    try {
      const resposta = await axios.post(URL_API, noticia);
      return resposta.data;
    } catch (erro) {
      console.error('Erro ao salvar notícia:', erro);
      throw erro;
    }
  }

  static async editarNoticia(id: string, noticia: NoticiaProps): Promise<NoticiaProps> {
    try {
      const resposta = await axios.put(`${URL_API}/${id}`, noticia);
      return resposta.data;
    } catch (erro) {
      console.error('Erro ao editar notícia:', erro);
      throw erro;
    }
  }

  static async excluirNoticia(id: string): Promise<void> {
    try {
      await axios.delete(`${URL_API}/${id}`);
    } catch (erro) {
      console.error('Erro ao excluir notícia:', erro);
      throw erro;
    }
  }
}

export default NoticiaService;
