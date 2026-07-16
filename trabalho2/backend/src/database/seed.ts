import * as bcrypt from 'bcrypt';
import dataSource from './data-source';
import { User } from '../auth/user.entity';
import { Content } from '../contents/content.entity';

const contents = [
  {
    title: 'Ladybug e Cat Noir',
    text: 'Marinette e Adrien protegem Paris usando os Miraculous da Joaninha e do Gato. Enquanto enfrentam ameaças, precisam conciliar suas responsabilidades heroicas com a vida escolar e manter suas identidades em segredo.',
    image: 'https://www.miraculousladybug.com/wp-content/uploads/2024/04/Season-3-Header.webp',
    displayOrder: 1,
  },
  {
    title: 'Os Kwamis',
    text: 'Kwamis são seres mágicos ligados aos Miraculous. Cada um representa um conceito e concede uma habilidade específica ao portador da joia correspondente.',
    image: 'https://www.miraculousladybug.com/wp-content/uploads/2024/03/pecto.png',
    displayOrder: 2,
  },
  {
    title: 'A Caixa dos Miraculous',
    text: 'A caixa guarda joias mágicas associadas a diferentes animais e poderes. O guardião é responsável por protegê-las e escolher portadores capazes de usá-las com responsabilidade.',
    image: 'https://www.miraculousladybug.com/wp-content/uploads/2024/03/Master-Fu.webp',
    displayOrder: 3,
  },
];

async function seed() {
  await dataSource.initialize();

  const users = dataSource.getRepository(User);
  if (!(await users.findOne({ where: { email: 'admin@miraculous.com' } }))) {
    await users.save(
      users.create({
        name: 'Administrador',
        email: 'admin@miraculous.com',
        passwordHash: await bcrypt.hash('Miraculous123!', 12),
      }),
    );
  }

  const repository = dataSource.getRepository(Content);
  if ((await repository.count()) === 0) await repository.save(repository.create(contents));

  await dataSource.destroy();
  console.log('Dados iniciais inseridos com sucesso.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
