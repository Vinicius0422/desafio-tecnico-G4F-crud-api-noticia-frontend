import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Pagination } from '@mui/material';
import { Edit, PlusCircle, Trash } from 'lucide-react';
import { Button } from '../button/index.tsx';
import NoticiaService from '../../service/noticia-service.ts';

import './listar-noticias.css';
import { toast } from 'react-toastify';


interface NoticiasProps {
    id: string;
    titulo: string;
    descricao: string;
}

const ListarNoticias = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [noticiasPaged, setNoticiasPaged] = useState<NoticiasProps[]>([]);
    const [totalNoticias, setTotalNoticias] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);



    const fetchNoticias = async (page, limit) => {
      setLoading(true);
      try {
        const response = await NoticiaService.buscarNoticiasPaginadas(page, limit);
        setNoticiasPaged(response.data);
        setTotalNoticias(response.total);
        setTotalPages(response.totalPages);
      } catch (error) {
        toast.error(error?.response?.data?.erro || "Erro ao buscar notícia");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchNoticias(currentPage, limit);
    }, [currentPage]);
    
      const handlePageChange = (event, value) => {
        setCurrentPage(value);
      };

      const handleEdit = async (id: string) => {
        navigate(`/editar/${id}`);
      }
    
      const handleDelete = async (id: string) => {
        try{
          await NoticiaService.excluirNoticia(id);
          toast.success("Notícia deletada com sucesso!");
        } catch (error){
          toast.error(error?.response?.data?.erro || "Erro ao deletar notícia");
        } finally {
          setCurrentPage(1);
          fetchNoticias(currentPage, limit);
        }
      }

    return (
        <main className="container">
          <section className="wrapper">
                <div className="content">
                    <h2>Lista de Notícias</h2>
                    <Button url="/novo">
                      <PlusCircle/>
                      <span>Adicionar Notícia</span>
                    </Button>

                    {loading && <p className="texto-carregando">Carregando...</p>}

                    {!loading && noticiasPaged.length === 0 && <p className="texto-sem-noticias">Não há notícias disponíveis.</p>}

                    <ul className="lista-noticias">
                        {!!noticiasPaged.length && noticiasPaged?.map((noticia) => (
                            <li key={noticia.id} className="item-noticia">
                              <div>
                                <h2>{noticia.titulo}</h2>
                                <p>{noticia.descricao}</p>
                              </div>
                              <div className="lista-acoes-noticias">
                                <Trash color='red' onClick={() => handleDelete(noticia.id)}/>
                                <Edit color='orange' onClick={(e) => handleEdit(noticia.id)}/>
                              </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="container-paginacao">
                    <Pagination
                        count={totalPages} 
                        page={currentPage} 
                        onChange={handlePageChange} 
                        color="primary" 
                        variant="outlined" 
                        shape="rounded" 
                    />
                </div>
          </section>
        </main>
    )
}

export default ListarNoticias;