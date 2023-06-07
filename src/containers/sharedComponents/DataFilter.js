import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { MultiSelect } from "react-multi-select-component";
import { useDispatch } from 'react-redux';
import { apiCaller } from '../../utils/apiCaller';
import { loadArticles, loadArticlesFailure, loadArticlesSuccess } from '../../redux/actions';

export const DataFilter = ({
    sourcesOptions,
    loading }) => {

    const dispatch = useDispatch();
    const [selectedSources, setSelectedSources] = useState([]);
    const [searchQuery, setSearchQuery] = useState('sports');

    const handleSourcesChange = async (selectedOptions) => {
        setSelectedSources(selectedOptions);
        try {
            let url = `/articles-from-newa-api?sources=${selectedOptions.map(source => source.value)}`;
            if (searchQuery) {
                url += `&q=${searchQuery}`;
            }
            const response = await apiCaller.get(url);
            dispatch(loadArticlesSuccess(response.data));
        } catch (error) {
            dispatch(loadArticlesFailure(error.message));
        }
    };

    const handleSearchChange = async (e) => {
        setSearchQuery(e.target.value)
        try {
            let url = `/articles-from-newa-api?q=${e.target.value}`;
            if (selectedSources) {
                url += `&sources=${selectedSources.map(source => source.value)}`;
            }
            const response = await apiCaller.get(url);
            dispatch(loadArticlesSuccess(response.data));
        } catch (error) {
            dispatch(loadArticlesFailure(error.message));
        }
    };

    return (
        <div className="data-filter" style={{ background: "#f7f7f7", marginTop: '80px', marginLeft: "20px", marginRight: "20px", padding: "20px" }}>
            <Form>
                <Row>
                    <Col md={3}>
                        <MultiSelect
                            options={sourcesOptions}
                            value={selectedSources}
                            onChange={handleSourcesChange}
                            labelledBy="Select"
                            isLoading={loading}
                            overrideStrings={{ selectSomeItems: "Select Preferred Sources" }}
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Control type="text" onChange={handleSearchChange} placeholder="Search topics" />
                    </Col>
                </Row>
            </Form>
        </div>
    )
};