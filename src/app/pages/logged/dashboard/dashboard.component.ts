import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/logged/header/header.component';

// Interfaces para tipagem dos dados
interface MetricasGerais {
  totalChamados: number;
  chamadosHoje: number;
  tempoMedio: number;
  taxaResolucao: number;
  crescimentoTotal: number;
  mediaDiaria: number;
}

interface AtendimentosPeriodo {
  hoje: number;
  semana: number;
  mes: number;
  ano: number;
}

interface PerformanceTecnico {
  nome: string;
  especializacao: string;
  atendimentosHoje: number;
  atendimentosSemana: number;
  atendimentosMes: number;
  tempoMedio: number;
  taxaResolucao: number;
  avaliacao: number;
}

interface StatusChamado {
  nome: string;
  quantidade: number;
  porcentagem: number;
  classe: string;
}

interface Prioridade {
  nome: string;
  quantidade: number;
  classe: string;
  icone: string;
}

interface Categoria {
  nome: string;
  quantidade: number;
  porcentagem: number;
  icone: string;
}

interface ChamadoRecente {
  numero: string;
  solicitante: string;
  problema: string;
  tecnico?: string;
  status: string;
  tempoDecorrido: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, DatePipe, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  // Data da última atualização
  lastUpdate: Date = new Date();

  // Período selecionado para visualização
  periodoSelecionado: string = 'mes';
  mostrarPeriodoTecnico: string = 'mes';

  // Métricas gerais do sistema
  metricas: MetricasGerais = {
    totalChamados: 1247,
    chamadosHoje: 23,
    tempoMedio: 4.2,
    taxaResolucao: 94,
    crescimentoTotal: 12,
    mediaDiaria: 18
  };

  // Atendimentos por período
  atendimentosPeriodo: AtendimentosPeriodo = {
    hoje: 23,
    semana: 127,
    mes: 542,
    ano: 1247
  };

  // Performance dos técnicos
  performanceTecnicos: PerformanceTecnico[] = [
    {
      nome: 'Marcos Silva',
      especializacao: 'Hardware/Redes',
      atendimentosHoje: 8,
      atendimentosSemana: 42,
      atendimentosMes: 178,
      tempoMedio: 3.5,
      taxaResolucao: 96,
      avaliacao: 4.8
    },
    {
      nome: 'Carla Mendes',
      especializacao: 'Software/Sistemas',
      atendimentosHoje: 6,
      atendimentosSemana: 38,
      atendimentosMes: 165,
      tempoMedio: 4.1,
      taxaResolucao: 94,
      avaliacao: 4.6
    },
    {
      nome: 'Rafael Santos',
      especializacao: 'Email/Comunicação',
      atendimentosHoje: 5,
      atendimentosSemana: 31,
      atendimentosMes: 134,
      tempoMedio: 2.8,
      taxaResolucao: 98,
      avaliacao: 4.9
    },
    {
      nome: 'Lucas Oliveira',
      especializacao: 'Infraestrutura',
      atendimentosHoje: 4,
      atendimentosSemana: 16,
      atendimentosMes: 65,
      tempoMedio: 6.2,
      taxaResolucao: 88,
      avaliacao: 4.2
    }
  ];

  // Status dos chamados
  statusChamados: StatusChamado[] = [
    { nome: 'Aberto', quantidade: 42, porcentagem: 35, classe: 'warning' },
    { nome: 'Em Andamento', quantidade: 28, porcentagem: 23, classe: 'info' },
    { nome: 'Aguardando', quantidade: 18, porcentagem: 15, classe: 'secondary' },
    { nome: 'Resolvido', quantidade: 32, porcentagem: 27, classe: 'success' }
  ];

  // Prioridades dos chamados
  prioridades: Prioridade[] = [
    { nome: 'Crítica', quantidade: 8, classe: 'danger', icone: 'fa-exclamation-circle' },
    { nome: 'Alta', quantidade: 15, classe: 'warning', icone: 'fa-arrow-up' },
    { nome: 'Média', quantidade: 34, classe: 'info', icone: 'fa-minus' },
    { nome: 'Baixa', quantidade: 23, classe: 'secondary', icone: 'fa-arrow-down' }
  ];

  // Categorias dos chamados
  categorias: Categoria[] = [
    { nome: 'Hardware', quantidade: 28, porcentagem: 35, icone: 'fa-desktop' },
    { nome: 'Software', quantidade: 22, porcentagem: 27, icone: 'fa-code' },
    { nome: 'Rede', quantidade: 18, porcentagem: 22, icone: 'fa-wifi' },
    { nome: 'Email', quantidade: 13, porcentagem: 16, icone: 'fa-envelope' }
  ];

  // Chamados recentes
  chamadosRecentes: ChamadoRecente[] = [
    {
      numero: '2024015',
      solicitante: 'Ana Costa',
      problema: 'Computador não liga',
      tecnico: 'Marcos Silva',
      status: 'Em Andamento',
      tempoDecorrido: '2h'
    },
    {
      numero: '2024014',
      solicitante: 'João Santos',
      problema: 'Internet lenta',
      tecnico: 'Lucas Oliveira',
      status: 'Aberto',
      tempoDecorrido: '3h'
    },
    {
      numero: '2024013',
      solicitante: 'Maria Oliveira',
      problema: 'Email não funciona',
      tecnico: 'Rafael Santos',
      status: 'Resolvido',
      tempoDecorrido: '1d'
    },
    {
      numero: '2024012',
      solicitante: 'Pedro Lima',
      problema: 'Impressora com problema',
      status: 'Aberto',
      tempoDecorrido: '4h'
    },
    {
      numero: '2024011',
      solicitante: 'Carla Silva',
      problema: 'Sistema travando',
      tecnico: 'Carla Mendes',
      status: 'Em Andamento',
      tempoDecorrido: '6h'
    }
  ];

  ngOnInit(): void {
    // Simular atualização automática dos dados a cada 30 segundos
    setInterval(() => {
      this.atualizarDados();
    }, 30000);
  }

  // Atualizar dados do dashboard
  refreshData(): void {
    this.lastUpdate = new Date();
    this.atualizarDados();
    console.log('Dados atualizados:', this.lastUpdate);
  }

  // Exportar relatório
  exportReport(): void {
    console.log('Exportando relatório...');
    alert('Funcionalidade de exportação será implementada!');
  }

  // Atualizar período selecionado
  atualizarPeriodo(): void {
    console.log('Período selecionado:', this.periodoSelecionado);
    // Aqui você implementaria a lógica para filtrar dados por período
  }

  // Toggle período dos técnicos
  togglePeriodoTecnico(): void {
    const periodos = ['dia', 'semana', 'mes'];
    const currentIndex = periodos.indexOf(this.mostrarPeriodoTecnico);
    this.mostrarPeriodoTecnico = periodos[(currentIndex + 1) % periodos.length];
  }

  // Obter classe CSS baseada na taxa de resolução
  getTaxaClass(taxa: number): string {
    if (taxa >= 95) return 'text-success';
    if (taxa >= 90) return 'text-warning';
    return 'text-danger';
  }

  // Obter classe CSS do status
  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Aberto': 'badge bg-warning',
      'Em Andamento': 'badge bg-info',
      'Aguardando': 'badge bg-secondary',
      'Resolvido': 'badge bg-success',
      'Fechado': 'badge bg-dark'
    };
    return statusClasses[status] || 'badge bg-secondary';
  }

  // Simular atualização de dados
  private atualizarDados(): void {
    // Simular pequenas mudanças nos dados
    this.metricas.chamadosHoje += Math.floor(Math.random() * 3) - 1;
    this.metricas.chamadosHoje = Math.max(0, this.metricas.chamadosHoje);

    // Atualizar horário
    this.lastUpdate = new Date();
  }
}
