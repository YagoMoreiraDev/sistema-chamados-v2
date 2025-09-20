import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalledModalComponent, ChamadoData } from '../../../components/logged/called-modal/called-modal.component';

@Component({
  selector: 'app-home-user',
  imports: [CalledModalComponent],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.scss'
})
export class HomeUserComponent {

  // Controle do modal de chamado
  isCalledModalOpen: boolean = false;

  constructor(private readonly router: Router) {}

  // Navegar para página de meus chamados
  navigateToMeusChamados(): void {
    this.router.navigate(['/todos-chamados']);
  }

  // Abrir modal de novo chamado
  openCalledModal(): void {
    this.isCalledModalOpen = true;
  }

  // Fechar modal
  onCalledModalClosed(): void {
    this.isCalledModalOpen = false;
  }

  // Quando um chamado é criado com sucesso
  onChamadoCriado(chamadoData: ChamadoData): void {
    console.log('Novo chamado criado:', chamadoData);
    this.isCalledModalOpen = false;

    // Aqui você pode implementar:
    // 1. Mostrar uma notificação de sucesso
    // 2. Salvar o chamado no backend
    // 3. Atualizar a lista de chamados do usuário
    // 4. Redirecionar para a página de acompanhamento

    // Simulação de notificação de sucesso
    this.showSuccessNotification(chamadoData);
  }

  // Método para mostrar notificação de sucesso
  private showSuccessNotification(chamadoData: ChamadoData): void {
    const protocolo = '#' + Date.now().toString().slice(-6);

    // Aqui você pode usar um serviço de toast/notification
    // Por enquanto, vou usar um alert simples
    alert(`✅ Chamado criado com sucesso!\n\nProtocolo: ${protocolo}\nTítulo: ${chamadoData.titulo}\nCategoria: ${this.getCategoriaNome(chamadoData.categoria)}\n\nVocê receberá atualizações por email.`);
  }

  // Helper para obter nome da categoria
  private getCategoriaNome(categoriaId: string): string {
    const categorias: { [key: string]: string } = {
      'hardware': 'Hardware',
      'software': 'Software',
      'rede': 'Rede/Internet',
      'email': 'E-mail',
      'equipamento': 'Equipamento',
      'treinamento': 'Treinamento'
    };

    return categorias[categoriaId] || 'Categoria não identificada';
  }
}
