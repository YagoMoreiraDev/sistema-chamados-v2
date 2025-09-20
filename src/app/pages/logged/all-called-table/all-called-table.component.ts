import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/logged/header/header.component';
import { TableCalledComponent } from '../../../components/logged/table-called/table-called.component';

@Component({
  selector: 'app-all-called-table',
  imports: [CommonModule, HeaderComponent, TableCalledComponent],
  templateUrl: './all-called-table.component.html',
  styleUrl: './all-called-table.component.scss'
})
export class AllCalledTableComponent implements OnInit {

  // Estatísticas dos chamados
  totalChamados: number = 0;
  chamadosAbertos: number = 0;
  chamadosAndamento: number = 0;
  chamadosResolvidos: number = 0;

  ngOnInit(): void {
    this.loadStatistics();
  }

  // Carregar estatísticas (futuramente virá de uma API)
  loadStatistics(): void {
    // Dados mock - posteriormente será substituído por chamadas de API
    this.totalChamados = 8;
    this.chamadosAbertos = 2;
    this.chamadosAndamento = 2;
    this.chamadosResolvidos = 4;
  }

  // Função para atualizar dados
  refreshData(): void {
    console.log('Atualizando dados...');
    this.loadStatistics();
    // Aqui você implementaria a lógica para atualizar a tabela
    // Exemplo: this.tableComponent.refreshData();
  }

  // Função para exportar dados
  exportData(): void {
    console.log('Exportando dados...');
    // Implementar lógica de exportação (PDF, Excel, etc.)
    alert('Funcionalidade de exportação será implementada!');
  }
}
