import { useEffect, useState } from "react";
import { getRecentListings } from "@core/lib";
import {
    PriceTypes,
    DeleteBtn,
    FormattedDate
} from "@core/components";

const RecentListingsTable = () => {

    const [listings, setListings] = useState([]);
    
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await getRecentListings(3);
                const data = await res;
                setListings(data.listings || []);
                console.log(data.listings);
            } catch (err) {
                console.error(err);
            }
        };

        fetchListings();
    }, []);

    const handleRowClick = () => {
        window.location.href = "/listings";
    };

    return (
        <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead style={{ cursor: "pointer" }} onClick={handleRowClick}>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Цена</th>
                        <th>Дата</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.length > 0 ? (
                        listings.map((listing) => (
                            <tr key={listing.id}>
                                <td>#{listing.id}</td>
                                <td>{listing.localizedTitle}</td>
                                <td>{listing.author?.name}</td>
                                <td>
                                    <PriceTypes listing={listing} />
                                </td>
                                <td><FormattedDate isoDate={listing.publishedAt} format="DMY"/></td>
                                <td>
                                    <div className="button-actions">
                                        <a href={`/listing/${listing.id}`} className="btn btn-secondary mr-1">
                                            <i className="fa-solid fa-eye"></i>
                                        </a>
                                        <DeleteBtn type="listing" id={listing.id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center">
                                Нет объявлений
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RecentListingsTable;