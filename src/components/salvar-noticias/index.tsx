import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import NoticiaService, { NoticiaRequestProps } from '../../service/noticia-service.ts';

import { toast } from 'react-toastify';
import './salvar-noticias.css';
import '../button/button.css';

export const SalvarNoticias = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit && id) {
      const fetchNoticia = async () => {
        try {
          setLoading(true);
          const response = await NoticiaService.buscarNoticiaPeloId(id!);
          setTitulo(response.titulo);
          setDescricao(response.descricao);
        } catch (error) {
          toast.error(error?.response?.data?.erro || "Erro ao buscar notícia");
          navigate("/")
        } finally {
          setLoading(false);
        }
      };
      fetchNoticia();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const noticia: NoticiaRequestProps = { titulo, descricao };

    try {
      if (isEdit) {
        await NoticiaService.editarNoticia(id!, noticia);
      } else {
        await NoticiaService.salvarNoticia(noticia);
      }
      toast.success("Salvo com sucesso!");
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.erro || "Erro ao buscar notícias");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h2>{isEdit ? 'Editar Notícia' : 'Nova Notícia'}</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="input-form"
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              className="input-form"
            />
          </div>

          <button type="submit" disabled={loading} className="btn">
            {loading ? 'Carregando...' : isEdit ? 'Atualizar Notícia' : 'Salvar Notícia'}
          </button>
        </form>
      </div>
    </div>
  );
}