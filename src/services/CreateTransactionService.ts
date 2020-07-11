import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const isBalanceValid = this.transactionsRepository.isValidTotal(value); // passa o valor para a função pra verificar se e valido ou não

    if (type === 'outcome' && !isBalanceValid) {
      // Se o tipo for outcome e a função não for valida retorna um erro.
      throw Error('Insuficient founds');
    }

    const transaction = this.transactionsRepository.create({
      // Cria a transaction
      title,
      value,
      type,
    });

    return transaction; // Retorna a transaction
  }
}

export default CreateTransactionService;
