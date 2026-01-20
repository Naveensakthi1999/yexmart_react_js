import SerachCard from '../shared/SearchCard';
import DataTable from './data-table';

const TableLayout = (props) => {
    return (
        <SerachCard title={`${props.title}`}
            setShowDrawer={props.setShowDrawer}
            search={props.search}
            handleSearch={props.handleSearch}
            onClickFormButton={props.onClickFormButton}
            onClickLinkButton={props.onClickLinkButton}
            onClickFilterButton={props.onClickFilterButton}
            link={props.link}
        >
            <DataTable {...props} />
        </SerachCard>
    );
};

export default TableLayout;
