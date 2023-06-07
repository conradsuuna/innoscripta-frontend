import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
    loadArticleSources,
    loadArticleSourcesFailure,
    loadArticleSourcesSuccess,
    updateUserPreferences,
    updateUserPreferencesFailure,
    updateUserPreferencesSuccess
} from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiCaller } from '../../../../utils/apiCaller';
import { MultiSelect } from "react-multi-select-component";

export const NewsFeedPersonalisationModal = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    // get article sources from state
    const {
        articleSources,
        articleCategories,
        loading,
    } = useSelector(state => state.articleSources);

    const handleSubmit = () => {
        dispatch(updateUserPreferences());

        const endpoint = '/add-preference';

        const body = {};
        if (selectedSources.length > 0) {
            body.preferred_sources = selectedSources.map(source => source.value);
        } else if (selectedCategories.length > 0) {
            body.category = selectedCategories.map(category => category.value);
        }

        dispatch(updateUserPreferences(body));
        // add auth to apiCaller
        apiCaller.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        apiCaller.post(endpoint, body)
            .then(() => {
                dispatch(updateUserPreferencesSuccess(body));
                handleClose();
            }).catch((error) => {
                dispatch(updateUserPreferencesFailure(error.message));
            });
    };

    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSourcesChange = (selectedOptions) => {
        setSelectedSources(selectedOptions);
        setSelectedCategories([]);
    };

    const handleCategoriesChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);
        setSelectedSources([]);
    };

    useEffect(() => {
        const fetchArticleSources = async () => {
            dispatch(loadArticleSources());
            try {
                const response = await apiCaller.get('/sources-from-newa-api');
                dispatch(loadArticleSourcesSuccess(response.data));
            } catch (error) {
                dispatch(loadArticleSourcesFailure(error.message));
            }
        };

        fetchArticleSources();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sourcesOptions = articleSources.map(article => ({
        label: article.name,
        value: article.id,
    }));

    const categoriesOptions = articleCategories.map(category => ({
        label: category.category,
        value: category.category,
    }));

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Set settings for your personal newsfeed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Preferred Sources</Form.Label>
                            <MultiSelect
                                options={sourcesOptions}
                                value={selectedSources}
                                onChange={handleSourcesChange}
                                labelledBy="Select"
                                isLoading={loading}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Preferred Categories</Form.Label>
                            <MultiSelect
                                options={categoriesOptions}
                                value={selectedCategories}
                                onChange={handleCategoriesChange}
                                labelledBy="Select"
                                isLoading={loading}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
