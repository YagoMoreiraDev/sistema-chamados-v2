import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Interfaces para tipagem
export interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  tipos: Tipo[];
  icon: string;
}

export interface Tipo {
  id: string;
  nome: string;
  descricao: string;
  prioridadeAutomatica: number;
  tempoEstimado: string;
  categoriaId: string;
}

export interface Prioridade {
  nivel: number;
  nome: string;
  descricao: string;
  cor: string;
  tempoResposta: string;
}

export interface ChamadoData {
  titulo: string;
  categoria: string;
  tipo: string;
  prioridade: number;
  descricao: string;
  localizacao?: string;
  contato?: string;
  usuarioId?: string;
  dataAbertura?: Date;
}

@Component({
  selector: 'app-called-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './called-modal.component.html',
  styleUrl: './called-modal.component.scss'
})
export class CalledModalComponent implements OnInit {

  // Inputs e Outputs
  @Input() isModalOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() chamadoCriado = new EventEmitter<ChamadoData>();

  // Form
  chamadoForm!: FormGroup;
  isSubmitting = false;

  // Dados para os selects
  categorias: Categoria[] = [
    {
      id: 'hardware',
      nome: 'Hardware',
      descricao: 'Problemas com equipamentos',
      icon: 'fas fa-desktop',
      tipos: [
        {
          id: 'computador',
          nome: 'Computador/Notebook',
          descricao: 'Problemas com computadores e notebooks',
          prioridadeAutomatica: 2,
          tempoEstimado: '2-4 horas',
          categoriaId: 'hardware'
        },
        {
          id: 'impressora',
          nome: 'Impressora',
          descricao: 'Problemas com impressoras',
          prioridadeAutomatica: 3,
          tempoEstimado: '4-6 horas',
          categoriaId: 'hardware'
        },
        {
          id: 'projetor',
          nome: 'Projetor/Monitor',
          descricao: 'Problemas com projetores e monitores',
          prioridadeAutomatica: 3,
          tempoEstimado: '4-8 horas',
          categoriaId: 'hardware'
        },
        {
          id: 'telefone',
          nome: 'Telefone/Ramal',
          descricao: 'Problemas com telefonia',
          prioridadeAutomatica: 2,
          tempoEstimado: '2-4 horas',
          categoriaId: 'hardware'
        }
      ]
    },
    {
      id: 'software',
      nome: 'Software',
      descricao: 'Problemas com programas e sistemas',
      icon: 'fas fa-code',
      tipos: [
        {
          id: 'sistema-operacional',
          nome: 'Sistema Operacional',
          descricao: 'Problemas com Windows, Linux, etc.',
          prioridadeAutomatica: 1,
          tempoEstimado: '1-3 horas',
          categoriaId: 'software'
        },
        {
          id: 'aplicativo',
          nome: 'Aplicativo/Programa',
          descricao: 'Problemas com programas específicos',
          prioridadeAutomatica: 2,
          tempoEstimado: '2-4 horas',
          categoriaId: 'software'
        },
        {
          id: 'antivirus',
          nome: 'Antivírus/Segurança',
          descricao: 'Problemas de segurança e antivírus',
          prioridadeAutomatica: 1,
          tempoEstimado: '30min-2h',
          categoriaId: 'software'
        },
        {
          id: 'driver',
          nome: 'Driver/Drivers',
          descricao: 'Instalação e atualização de drivers',
          prioridadeAutomatica: 3,
          tempoEstimado: '1-3 horas',
          categoriaId: 'software'
        }
      ]
    },
    {
      id: 'rede',
      nome: 'Rede/Internet',
      descricao: 'Problemas de conectividade',
      icon: 'fas fa-wifi',
      tipos: [
        {
          id: 'internet',
          nome: 'Sem Internet',
          descricao: 'Problemas de conexão com a internet',
          prioridadeAutomatica: 1,
          tempoEstimado: '30min-2h',
          categoriaId: 'rede'
        },
        {
          id: 'rede-local',
          nome: 'Rede Local',
          descricao: 'Problemas na rede interna',
          prioridadeAutomatica: 2,
          tempoEstimado: '1-4 horas',
          categoriaId: 'rede'
        },
        {
          id: 'wifi',
          nome: 'Wi-Fi',
          descricao: 'Problemas com conexão wireless',
          prioridadeAutomatica: 2,
          tempoEstimado: '30min-2h',
          categoriaId: 'rede'
        },
        {
          id: 'compartilhamento',
          nome: 'Compartilhamento',
          descricao: 'Problemas com pastas compartilhadas',
          prioridadeAutomatica: 3,
          tempoEstimado: '2-6 horas',
          categoriaId: 'rede'
        }
      ]
    },
    {
      id: 'email',
      nome: 'E-mail',
      descricao: 'Problemas com correio eletrônico',
      icon: 'fas fa-envelope',
      tipos: [
        {
          id: 'configuracao-email',
          nome: 'Configuração',
          descricao: 'Configurar cliente de e-mail',
          prioridadeAutomatica: 2,
          tempoEstimado: '1-2 horas',
          categoriaId: 'email'
        },
        {
          id: 'acesso-email',
          nome: 'Acesso',
          descricao: 'Problemas para acessar e-mail',
          prioridadeAutomatica: 2,
          tempoEstimado: '30min-1h',
          categoriaId: 'email'
        },
        {
          id: 'envio-recebimento',
          nome: 'Envio/Recebimento',
          descricao: 'Problemas para enviar ou receber e-mails',
          prioridadeAutomatica: 2,
          tempoEstimado: '1-3 horas',
          categoriaId: 'email'
        }
      ]
    },
    {
      id: 'equipamento',
      nome: 'Equipamento',
      descricao: 'Solicitação de novos equipamentos',
      icon: 'fas fa-shopping-cart',
      tipos: [
        {
          id: 'notebook',
          nome: 'Notebook/Computador',
          descricao: 'Solicitação de notebook ou computador',
          prioridadeAutomatica: 4,
          tempoEstimado: '5-15 dias úteis',
          categoriaId: 'equipamento'
        },
        {
          id: 'impressora-nova',
          nome: 'Impressora',
          descricao: 'Solicitação de impressora',
          prioridadeAutomatica: 4,
          tempoEstimado: '3-10 dias úteis',
          categoriaId: 'equipamento'
        },
        {
          id: 'acessorios',
          nome: 'Acessórios',
          descricao: 'Mouse, teclado, cabos, etc.',
          prioridadeAutomatica: 4,
          tempoEstimado: '2-7 dias úteis',
          categoriaId: 'equipamento'
        },
        {
          id: 'software-licenca',
          nome: 'Software/Licença',
          descricao: 'Solicitação de software ou licenças',
          prioridadeAutomatica: 3,
          tempoEstimado: '3-10 dias úteis',
          categoriaId: 'equipamento'
        }
      ]
    },
    {
      id: 'treinamento',
      nome: 'Treinamento',
      descricao: 'Suporte e treinamento',
      icon: 'fas fa-graduation-cap',
      tipos: [
        {
          id: 'uso-sistema',
          nome: 'Uso de Sistema',
          descricao: 'Ajuda para usar sistemas específicos',
          prioridadeAutomatica: 3,
          tempoEstimado: '1-2 horas',
          categoriaId: 'treinamento'
        },
        {
          id: 'capacitacao',
          nome: 'Capacitação',
          descricao: 'Treinamento em ferramentas',
          prioridadeAutomatica: 4,
          tempoEstimado: '2-8 horas',
          categoriaId: 'treinamento'
        }
      ]
    }
  ];

  prioridades: Prioridade[] = [
    {
      nivel: 1,
      nome: 'Crítica',
      descricao: 'Resolver imediatamente',
      cor: '#dc3545',
      tempoResposta: 'Até 1 hora'
    },
    {
      nivel: 2,
      nome: 'Alta',
      descricao: 'Resolver no mesmo dia',
      cor: '#fd7e14',
      tempoResposta: 'Até 4 horas'
    },
    {
      nivel: 3,
      nome: 'Média',
      descricao: 'Resolver em até 2 dias úteis',
      cor: '#ffc107',
      tempoResposta: 'Até 2 dias úteis'
    },
    {
      nivel: 4,
      nome: 'Baixa',
      descricao: 'Resolver quando possível',
      cor: '#28a745',
      tempoResposta: 'Até 5 dias úteis'
    }
  ];

  // Propriedades para controle dos selects
  categoriaSelecionada: string = '';
  tipoSelecionado: string = '';
  tiposDisponiveis: Tipo[] = [];
  prioridadesDisponiveis: Prioridade[] = this.prioridades;
  prioridadeAutomatica: number = 0;
  mostrarAlertaEquipamento = false;

  constructor(private readonly fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.chamadoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(10)]],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      prioridade: [''],
      descricao: ['', [Validators.required, Validators.minLength(20)]],
      localizacao: [''],
      contato: ['']
    });
  }

  onCategoriaChange(event: any): void {
    const categoriaId = event.target.value;
    this.categoriaSelecionada = categoriaId;

    // Reset dependent fields
    this.chamadoForm.get('tipo')?.setValue('');
    this.chamadoForm.get('prioridade')?.setValue('');
    this.tipoSelecionado = '';
    this.prioridadeAutomatica = 0;

    // Update available types
    const categoria = this.categorias.find(c => c.id === categoriaId);
    this.tiposDisponiveis = categoria ? categoria.tipos : [];

    // Show equipment alert
    this.mostrarAlertaEquipamento = categoriaId === 'equipamento';
  }

  onTipoChange(event: any): void {
    const tipoId = event.target.value;
    this.tipoSelecionado = tipoId;

    // Find the selected type and set automatic priority
    const tipo = this.tiposDisponiveis.find(t => t.id === tipoId);
    if (tipo) {
      this.prioridadeAutomatica = tipo.prioridadeAutomatica;
      this.chamadoForm.get('prioridade')?.setValue(tipo.prioridadeAutomatica);
    }
  }

  // Helper methods for template
  getCategoriaNome(categoriaId: string): string {
    const categoria = this.categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nome : '';
  }

  getTipoNome(tipoId: string): string {
    const tipo = this.tiposDisponiveis.find(t => t.id === tipoId);
    return tipo ? tipo.nome : '';
  }

  getPrioridadeNome(prioridadeNivel: number): string {
    const prioridade = this.prioridades.find(p => p.nivel === prioridadeNivel);
    return prioridade ? prioridade.nome : '';
  }

  getTempoEstimado(): string {
    if (this.tipoSelecionado) {
      const tipo = this.tiposDisponiveis.find(t => t.id === this.tipoSelecionado);
      return tipo ? tipo.tempoEstimado : 'A definir';
    }
    return 'A definir';
  }

  // Modal methods
  closeModal(): void {
    this.isModalOpen = false;
    this.modalClosed.emit();
    this.resetForm();
  }

  resetForm(): void {
    this.chamadoForm.reset();
    this.categoriaSelecionada = '';
    this.tipoSelecionado = '';
    this.tiposDisponiveis = [];
    this.prioridadeAutomatica = 0;
    this.mostrarAlertaEquipamento = false;
  }

  onSubmit(): void {
    if (this.chamadoForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        const chamadoData: ChamadoData = {
          ...this.chamadoForm.value,
          usuarioId: 'current-user', // This would come from auth service
          dataAbertura: new Date()
        };

        this.chamadoCriado.emit(chamadoData);
        this.isSubmitting = false;
        this.closeModal();

        // Show success message (you can implement a toast service)
        console.log('Chamado criado com sucesso:', chamadoData);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.chamadoForm.controls).forEach(key => {
        this.chamadoForm.get(key)?.markAsTouched();
      });
    }
  }
}
