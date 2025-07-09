import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from 'src/modules/product/entities/product.entity'; // ajuste o caminho se necessário
import { ProductCategory } from 'src/core/shared/enums';

export async function seedProducts(dataSource: DataSource) {
    const productRepo: Repository<ProductEntity> = dataSource.getRepository(ProductEntity);

    const products = [
        { name: 'Coxinha', value: 5.0, category: ProductCategory.SALGADO },
        { name: 'Refrigerante Lata', value: 4.5, category: ProductCategory.BEBIDA },
        { name: 'Suco Natural', value: 3.5, category: ProductCategory.BEBIDA },
        { name: 'Barra de Chocolate', value: 2.5, category: ProductCategory.DOCE },
        { name: 'Maçã', value: 1.5, category: ProductCategory.FRUTA },
        { name: 'Pão de Queijo', value: 3.0, category: ProductCategory.LANCHE },
        { name: 'Bolo de Cenoura', value: 2.0, category: ProductCategory.LANCHE },
        { name: 'Brigadeiro', value: 1.0, category: ProductCategory.DOCE },
        { name: 'Banana', value: 1.2, category: ProductCategory.FRUTA },
        { name: 'Pastel de Queijo', value: 4.0, category: ProductCategory.SALGADO },
    ];

    try {
        const existingProducts = await productRepo.find();
        if (existingProducts.length > 0) {
            console.log('products already exist. Skipping seed...');
            return;
        }

        const productEntities = products.map((product) =>
            productRepo.create(product),
        );

        await productRepo.save(productEntities);
        console.log('products saved successfully!');
    } catch (error) {
        console.error('error saving products:', error);
        throw error;
    }
}
