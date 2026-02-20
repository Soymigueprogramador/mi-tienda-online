export const getProducts = () => {
    return Promise.resolve([
        {
            id: 1,
            title: "Remera Oversize Black",
            price: 24999,
            image: "https://picsum.photos/400?1",
        },
        {
            id: 2,
            title: "Hoodie Essential",
            price: 45999,
            image: "https://picsum.photos/400?2",
        },
        {
            id: 3,
            title: "Jogger Minimal",
            price: 38999,
            image: "https://picsum.photos/400?3",
        },
        {
            id: 4,
            title: "Campera Denim",
            price: 68999,
            image: "https://picsum.photos/400?4",
        },
    ]);
};