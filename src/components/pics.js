// Home.js
import React from 'react';


const Home = () => {
    return (
        <div>
        <h2 style={{ fontFamily: 'initial'} }>Live search: React Application</h2>

        <div className="input-group">
        <input type="text" className="form-control" placeholder="Nhập từ khóa..." />
        <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
            <i className="fas fa-search"></i> {/* Biểu tượng kính lúp */}
            </button>
        </div>
        </div>
</div>
    );
  };
export default Home;
