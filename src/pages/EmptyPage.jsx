import Header from "@/components/Header";

const EmptyPage = () => {
    return (
        <div>
            <Header
                user={undefined}
                isEmpty={true}
            />
        </div>
    );
};

export default EmptyPage;