import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadArticles, loadArticlesFailure, loadArticlesSuccess } from '../../../redux/actions';
import { apiCaller } from '../../../utils/apiCaller';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Loader } from '../../sharedComponents/Loader';
import moment from 'moment';
import { DataFilter } from '../../sharedComponents/DataFilter';

export const Articles = () => {
    // select from state
    const {
        articles,
        loading,
        error,
    } = useSelector(state => state.articles);

    const {
        articleSources,
        loading: sourcesLoading,
    } = useSelector(state => state.articleSources);

    const sourcesOptions = articleSources.map(article => ({
        label: article.name,
        value: article.id,
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchArticles = async () => {
            dispatch(loadArticles());
            try {
                const response = await apiCaller.get('/articles-from-newa-api?q=entertainment');
                dispatch(loadArticlesSuccess(response.data));
            } catch (error) {
                dispatch(loadArticlesFailure(error.message));
            }
        };

        fetchArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {error && <p>Loading data failed, please try again!</p>}
            <div style={{ margin: '60px 10px 10px 10px' }}>
                <DataFilter
                    sourcesOptions={sourcesOptions}
                    loading={sourcesLoading}
                />

                <Row md={4} className="g-4" style={{ margin: '5px' }}>
                    {loading ? (
                        <Loader />
                    ) : (
                        articles.map((article, index) => (
                            <Col key={index}>
                                <Card onClick={() => window.location.href = article.url} style={{ cursor: "pointer", height: "400px" }}>
                                    <Card.Img variant="top" src={article.urlToImage} height="172" />
                                    <Card.Body>
                                        <Card.Title>{article.title}</Card.Title>
                                        <Card.Text>
                                            {article.description && article.description.slice(0, 50) + ' ...'}
                                        </Card.Text>
                                    </Card.Body>

                                    <Card.Footer>
                                        <small className="text-muted">
                                            {article.source.name} | {moment(article.publishedAt).fromNow()}
                                        </small>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </>
    );
};
