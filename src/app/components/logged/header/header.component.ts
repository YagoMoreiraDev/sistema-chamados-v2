import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CalledModalComponent } from '../called-modal/called-modal.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterModule, CalledModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Propriedades do componente
  isMobileMenuOpen: boolean = false;
  activeRoute: string = 'inicio';
  searchTerm: string = '';
  userName: string = 'Usuário Teste';

  // Controle do modal de chamado
  isCalledModalOpen: boolean = false;

  // Propriedades para controle do header
  isHeaderHidden: boolean = false;
  private lastScrollTop: number = 0;
  private readonly scrollThreshold: number = 100; // Pixels para começar a esconder
  private readonly mouseTopZone: number = 60; // Altura da zona do mouse no topo

  constructor(
    private readonly router: Router,
    private readonly elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    // Detectar rota ativa inicial
    this.detectActiveRoute();

    // Inicializar listeners de scroll e mouse
    this.setupScrollListener();
    this.setupMouseListener();
  }

  ngOnDestroy(): void {
    // Remover listeners ao destruir componente
    this.removeEventListeners();
  }

  // Toggle do menu mobile
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Definir rota ativa
  setActiveRoute(route: string): void {
    this.activeRoute = route;
    this.isMobileMenuOpen = false; // Fechar menu mobile após clique
  }

  // Detectar rota ativa baseada na URL
  detectActiveRoute(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('todos-chamados')) {
      this.activeRoute = 'todos-chamados';
    } else if (currentUrl.includes('novo-chamado')) {
      this.activeRoute = 'novo-chamado';
    } else if (currentUrl.includes('relatorios')) {
      this.activeRoute = 'relatorios';
    } else if (currentUrl.includes('servicos')) {
      this.activeRoute = 'servicos';
    } else {
      this.activeRoute = 'inicio';
    }
  }

  // Função de busca
  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchTerm.trim()) {
      console.log('Pesquisando por:', this.searchTerm);
      // Aqui você implementaria a lógica de busca
      // Exemplo: this.searchService.search(this.searchTerm);
    }
  }

  // Logout
  logout(): void {
    // Implementar lógica de logout
    console.log('Fazendo logout...');
    alert('Funcionalidade de logout será implementada!');
  }

  // Controle do modal de chamado
  openCalledModal(): void {
    this.isCalledModalOpen = true;
  }

  onCalledModalClosed(): void {
    this.isCalledModalOpen = false;
  }

  onChamadoCriado(chamadoData: any): void {
    console.log('Novo chamado criado:', chamadoData);
    this.isCalledModalOpen = false;

    // Aqui você pode implementar:
    // 1. Salvar o chamado no backend
    // 2. Atualizar a lista de chamados
    // 3. Mostrar notificação de sucesso
    // 4. Redirecionar para a página de chamados

    alert('Chamado criado com sucesso! Número do protocolo: #' + Date.now().toString().slice(-6));
  }

  // Configurar listener de scroll
  private setupScrollListener(): void {
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
  }

  // Configurar listener de mouse
  private setupMouseListener(): void {
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  // Remover event listeners
  private removeEventListeners(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this));
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  // Handler do scroll
  private onScroll(): void {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Se o scroll passou do threshold e está descendo
    if (currentScrollTop > this.scrollThreshold && currentScrollTop > this.lastScrollTop) {
      this.hideHeader();
    }

    // Atualizar a posição do último scroll
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Para mobile
  }

  // Handler do movimento do mouse
  private onMouseMove(event: MouseEvent): void {
    // Se o mouse estiver na zona superior da tela e o header estiver escondido
    if (event.clientY <= this.mouseTopZone && this.isHeaderHidden) {
      this.showHeader();
    }
  }

  // Esconder header
  private hideHeader(): void {
    if (!this.isHeaderHidden) {
      this.isHeaderHidden = true;
      const navbar = this.elementRef.nativeElement.querySelector('.navbar');
      if (navbar) {
        navbar.classList.add('header-hidden');
      }
    }
  }

  // Mostrar header
  private showHeader(): void {
    if (this.isHeaderHidden) {
      this.isHeaderHidden = false;
      const navbar = this.elementRef.nativeElement.querySelector('.navbar');
      if (navbar) {
        navbar.classList.remove('header-hidden');
      }
    }
  }
}
