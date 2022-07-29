import { SimulacaoAdapter } from '../adapters/SimulacaoAdapter.js';
import Simulacao from '../database/models/index.js';
import Usuarios from '../database/models/Usuario.js';

const simulacaoController = {
    listarSimulacao: async (req,res) => {
        const listaDeSimulacao = await Simulacao.findAll();
        res.json(listaDeSimulacao);
    },
    
    async cadastrarSimulacao (req,res) {
        const { aporteInicial, aporteMensal, taxaAA, prazoMeses } = req.body; 
    
        const novaSimulacao = await Simulacao.create({
            aporteInicial,
            aporteMensal,
            taxaAA,
            prazoMeses,
        });

        const simulacao = SimulacaoAdapter.getSimulacao(aporteInicial, aporteMensal, taxaAA, prazoMeses);
        res.status(201).json(simulacao);
    },

    async deletarSimulacao (req,res) {
        try {
            
            const { id } = req.params;
    
            await Simulacao.destroy({
                where: {
                    id,
                },
            });
            res.status(204);
        } catch (error) {
            res.status(500).json('Ocorreu algum problema com a deleção');
        }
    },

    async atualizaSimulacao (req,res) {
        const {id} = req.params;
        const { aporteInicial, aporteMensal, taxaAA, prazoMeses, idUsuario } = req.body;

        if (!id) return res.status(400).json('id não enviado.');

        const simulacaoAtualizado = await Simulacao.update({
            aporteInicial,
            aporteMensal,
            taxaAA,
            prazoMeses,
            idUsuario,
        });

        res.json(simulacaoAtualizado);

    },

    async buscaSimulacaoID (req,res) {
        const {id} = req.params;
        const retornaSimulacaoId  = await Simulacao.findByPk(id);

        res.json(retornaSimulacaoId);
    },


};


export default simulacaoController;

