import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  // Cria um Data Transfer Object
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // Cria uma função que ira buscar o income, outcome do array de transactions somando pela função reduce
  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (
          transaction.type // Fez um switch para verificar o tipo da transaction.
        ) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            // Não faz nada por padrão
            break;
        }
        return accumulator;
      },
      {
        // Inicializa os valores como 0
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome; // Depois calculamos o total
    return { income, outcome, total }; // E retornamos um objeto com income, outcome, total.
  }

  // Cria uma função para verificar se o valor é valido
  public isValidTotal(value: number): boolean | null {
    const balance = this.getBalance();
    const isValid = balance.total > value;
    return isValid || null;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type }); // Instancia uma nova transação.
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
