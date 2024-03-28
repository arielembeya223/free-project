import React from 'react';
import ReactDOM from 'react-dom/client';

function Welcome() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Ariel est la </div>

                        <div className="card-body">tu nes pas la </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;

if (document.getElementById('welcome')) {
    const Index = ReactDOM.createRoot(document.getElementById("welcome"));

    Index.render(
        <React.StrictMode>
            <Welcome/>
        </React.StrictMode>
    )
}
