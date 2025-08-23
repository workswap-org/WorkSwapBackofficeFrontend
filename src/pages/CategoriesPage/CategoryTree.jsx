import "#/css/pages/categories-page.css";

const buildCategoryTree = (categories) => {
    const map = new Map();
    const roots = [];

    // создаём Map для быстрого доступа по id
    categories.forEach(cat => map.set(cat.id, { ...cat, children: [] }));

    categories.forEach(cat => {
        if (cat.parentId) {
            const parent = map.get(cat.parentId);
            if (parent) {
                parent.children.push(map.get(cat.id));
            }
        } else {
            roots.push(map.get(cat.id));
        }
    });

    return roots;
};

const CategoryTree = ({ categories }) => {
    const tree = buildCategoryTree(categories);

    const renderTree = (nodes) => (
        <ul>
            {nodes.map(node => (
                <li key={node.id}>
                    <span>{node.translate}</span>
                    {node.children.length > 0 && renderTree(node.children)}
                </li>
            ))}
        </ul>
    );

    return renderTree(tree);
};

export default CategoryTree;
