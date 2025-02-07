import axios from 'axios';

const URL_API = 'http://localhost:5000/noticias';

interface NoticiasPaginadas {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    data: NoticiaProps[]
}

export interface NoticiaProps {
    id: string;
    titulo: string;
    descricao: string;
}

export interface NoticiaRequestProps {
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
      throw erro;
    }
  }

  static async buscarNoticiaPeloId(id: string): Promise<NoticiaProps> {
    try {
      const response = await axios.get(`${URL_API}/${id}`);
      return response.data
    } catch (erro) {
      throw erro;
    }
  }

  static async salvarNoticia(noticia: NoticiaRequestProps): Promise<NoticiaProps> {
    try {
      const resposta = await axios.post(URL_API, noticia);
      return resposta.data;
    } catch (erro) {
      throw erro;
    }
  }

  static async editarNoticia(id: string, noticia: NoticiaRequestProps): Promise<NoticiaProps> {
    try {
      const resposta = await axios.put(`${URL_API}/${id}`, noticia);
      return resposta.data;
    } catch (erro) {
      throw erro;
    }
  }

  static async excluirNoticia(id: string): Promise<void> {
    try {
      await axios.delete(`${URL_API}/${id}`);
    } catch (erro) {
      throw erro;
    }
  }
}

export default NoticiaService;
