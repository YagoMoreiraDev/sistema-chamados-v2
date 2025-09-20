import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface para tipagem dos chamados
interface Chamado {
  numero: string;
  solicitante: string;
  descricao: string;
  dataHora: Date;
  comentario: string;
  status: 'Aberto' | 'Em Andamento' | 'Resolvido' | 'Fechado';
  tecnico?: string; // Técnico responsável pelo atendimento
}

@Component({
  selector: 'app-table-called',
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './table-called.component.html',
  styleUrl: './table-called.component.scss'
})
export class TableCalledComponent implements OnInit {

  // Dados mock dos chamados (futuramente virá do backend)
  chamados: Chamado[] = [
    {
      numero: '2024001',
      solicitante: 'João Silva Santos',
      descricao: 'Problema na impressora da sala 205. Não está imprimindo documentos.',
      dataHora: new Date('2024-09-20T09:30:00'),
      comentario: 'Verificar conexão de rede da impressora.',
      status: 'Aberto',
      tecnico: 'Marcos Silva'
    },
    {
      numero: '2024002',
      solicitante: 'Maria Oliveira Costa',
      descricao: 'Computador lento, demora muito para iniciar os programas.',
      dataHora: new Date('2024-09-20T10:15:00'),
      comentario: 'Solicitada limpeza de disco e verificação de vírus.',
      status: 'Em Andamento',
      tecnico: 'Carla Mendes'
    },
    {
      numero: '2024003',
      solicitante: 'Pedro Henrique Alves',
      descricao: 'Email não está funcionando, não consigo enviar mensagens.',
      dataHora: new Date('2024-09-19T14:22:00'),
      comentario: 'Problema resolvido - configuração SMTP corrigida.',
      status: 'Resolvido',
      tecnico: 'Rafael Santos'
    },
    {
      numero: '2024004',
      solicitante: 'Ana Carolina Ferreira',
      descricao: 'Sistema de ponto eletrônico não reconhece minha digital.',
      dataHora: new Date('2024-09-19T08:45:00'),
      comentario: 'Digital recadastrada com sucesso.',
      status: 'Fechado',
      tecnico: 'Lucas Oliveira'
    },
    {
      numero: '2024005',
      solicitante: 'Carlos Eduardo Lima',
      descricao: 'Internet instável no departamento jurídico.',
      dataHora: new Date('2024-09-18T16:30:00'),
      comentario: 'Verificando com provedora. Aguardando retorno técnico.',
      status: 'Em Andamento',
      tecnico: 'Fernanda Lima'
    },
    {
      numero: '2024006',
      solicitante: 'Luciana Santos Rocha',
      descricao: 'Monitor com tela piscando constantemente.',
      dataHora: new Date('2024-09-18T11:10:00'),
      comentario: '',
      status: 'Aberto'
    },
    {
      numero: '2024007',
      solicitante: 'Roberto Silva Nunes',
      descricao: 'Software de gestão apresentando erro ao gerar relatórios.',
      dataHora: new Date('2024-09-17T13:20:00'),
      comentario: 'Update do sistema realizado. Problema corrigido.',
      status: 'Resolvido',
      tecnico: 'Marcos Silva'
    },
    {
      numero: '2024008',
      solicitante: 'Fernanda Costa Almeida',
      descricao: 'Telefone IP sem sinal de discagem.',
      dataHora: new Date('2024-09-17T09:05:00'),
      comentario: 'Cabo de rede substituído. Funcionando normalmente.',
      status: 'Fechado',
      tecnico: 'Carla Mendes'
    }
  ];

  // Propriedades para filtros
  filteredChamados: Chamado[] = [];
  searchTerm: string = '';
  statusFilter: string = '';

  ngOnInit(): void {
    this.filteredChamados = [...this.chamados];
  }

  // Função para filtrar chamados
  filterChamados(): void {
    this.filteredChamados = this.chamados.filter(chamado => {
      const matchesSearch = !this.searchTerm ||
        chamado.numero.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        chamado.solicitante.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        chamado.descricao.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        chamado.tecnico?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = !this.statusFilter || chamado.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  // Função para obter classe CSS do status
  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Aberto': 'status-aberto',
      'Em Andamento': 'status-andamento',
      'Resolvido': 'status-resolvido',
      'Fechado': 'status-fechado'
    };
    return statusClasses[status] || '';
  }

  // TrackBy function para performance do *ngFor
  trackByChamado(index: number, chamado: Chamado): string {
    return chamado.numero;
  }
}
