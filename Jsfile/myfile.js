document.addEventListener('DOMContentLoaded', function () {

    // --- BOOK BUTTONS (Home Page) ---
    var bookBtn = document.getElementById('bookBtn');
    if (bookBtn) {
        bookBtn.addEventListener('click', function () {
            window.location.href = 'Pages/Contact.html';
        });
    }

    var ctaBookBtn = document.getElementById('ctaBookBtn');
    if (ctaBookBtn) {
        ctaBookBtn.addEventListener('click', function () {
            window.location.href = 'Pages/Contact.html';
        });
    }

    // --- GALLERY FILTER (Gallery Page) ---
    var filterRadios = document.querySelectorAll('input[name="hallType"]');
    var galleryCards = document.querySelectorAll('.gallery-card');

    if (filterRadios.length > 0 && galleryCards.length > 0) {
        filterRadios.forEach(function (radio) {
            radio.addEventListener('change', function () {
                var selected = this.value;
                galleryCards.forEach(function (card) {
                    if (selected === 'all') {
                        card.style.display = 'block';
                    } else if (card.dataset.type === selected) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- LOGIN FORM VALIDATION ---
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var username = document.getElementById('username').value.trim();
            var password = document.getElementById('password').value.trim();
            var alertBox = document.getElementById('loginAlert');

            if (!username || !password) {
                alertBox.textContent = 'Please fill in all fields.';
                alertBox.className = 'alert-box alert-error';
                alertBox.style.display = 'block';
                return;
            }

            alertBox.textContent = 'Login successful! Redirecting to your dashboard...';
            alertBox.className = 'alert-box alert-success';
            alertBox.style.display = 'block';
            setTimeout(function () {
                window.location.href = 'Dashboard.html';
            }, 1500);
        });
    }

    // --- SIGNIN FORM VALIDATION ---
    var signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = document.getElementById('email').value.trim();
            var password = document.getElementById('password').value.trim();
            var confirmPassword = document.getElementById('confirmPassword').value.trim();
            var alertBox = document.getElementById('signinAlert');

            if (!email || !password || !confirmPassword) {
                alertBox.textContent = 'Please fill in all fields.';
                alertBox.className = 'alert-box alert-error';
                alertBox.style.display = 'block';
                return;
            }

            if (password !== confirmPassword) {
                alertBox.textContent = 'Passwords do not match.';
                alertBox.className = 'alert-box alert-error';
                alertBox.style.display = 'block';
                return;
            }

            if (password.length < 6) {
                alertBox.textContent = 'Password must be at least 6 characters.';
                alertBox.className = 'alert-box alert-error';
                alertBox.style.display = 'block';
                return;
            }

            alertBox.textContent = 'Account created! Redirecting to login...';
            alertBox.className = 'alert-box alert-success';
            alertBox.style.display = 'block';
            setTimeout(function () {
                window.location.href = 'Login.html';
            }, 1500);
        });
    }

    // --- CONTACT/BOOKING FORM VALIDATION ---
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = document.getElementById('name').value.trim();
            var email = document.getElementById('email').value.trim();
            var date = document.getElementById('eventDate').value;
            var guests = document.getElementById('guests').value.trim();
            var alertBox = document.getElementById('contactAlert');

            if (!name || !email || !date || !guests) {
                alertBox.textContent = 'Please fill in all required fields.';
                alertBox.className = 'alert-box alert-error';
                alertBox.style.display = 'block';
                return;
            }

            alertBox.textContent = 'Booking request sent! We will contact you within 24 hours.';
            alertBox.className = 'alert-box alert-success';
            alertBox.style.display = 'block';
            contactForm.reset();
        });
    }

    // === DASHBOARD STOCK MANAGEMENT ===
    

    // =====================
    // STOCK DATA (in-memory)
    // =====================
    var stockData = [
        { id: 'ST-001', name: 'Gold Wedding Package',   category: 'Package',      price: 281400, qty: 10, status: 'Available' },
        { id: 'ST-002', name: 'Silver Wedding Package', category: 'Package',      price: 140700, qty: 15, status: 'Available' },
        { id: 'ST-003', name: 'Floral Stage Decoration',category: 'Decoration',   price: 45000,  qty: 8,  status: 'Limited'   },
        { id: 'ST-004', name: 'Premium Catering Service',category: 'Catering',    price: 120000, qty: 5,  status: 'Limited'   },
        { id: 'ST-005', name: 'Photography Package',    category: 'Photography',  price: 75000,  qty: 0,  status: 'Unavailable'}
    ];

    var cartData = [];
    var idCounter = 6;

    // =====================
    // SECTION BUTTONS (top cards)
    // =====================
    var sectionBtns = document.querySelectorAll('[data-section]');
    sectionBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var target = btn.getAttribute('data-section');
            var el = document.getElementById(target);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                el.classList.add('section-highlight');
                setTimeout(function () { el.classList.remove('section-highlight'); }, 1000);
            }
        });
    });

    // =====================
    // RENDER STOCK TABLE
    // =====================
    function renderTable(data) {
        var tbody = document.getElementById('stockTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';
        if (data.length === 0) {
            tbody.innerHTML = '<tr class="table-row"><td class="table-cell" colspan="7">No records found.</td></tr>';
            return;
        }
        data.forEach(function (item) {
            var badgeClass = item.status === 'Available' ? 'confirmed' : item.status === 'Limited' ? 'pending' : 'cancelled';
            var tr = document.createElement('tr');
            tr.className = 'table-row';
            tr.setAttribute('data-id', item.id);
            tr.innerHTML =
                '<td class="table-cell">#' + item.id + '</td>' +
                '<td class="table-cell">' + item.name + '</td>' +
                '<td class="table-cell">' + item.category + '</td>' +
                '<td class="table-cell">' + item.price.toLocaleString() + '</td>' +
                '<td class="table-cell">' + item.qty + '</td>' +
                '<td class="table-cell"><span class="status-badge ' + badgeClass + '">' + item.status + '</span></td>' +
                '<td class="table-cell action-buttons">' +
                    '<button class="btn-small btn-edit" data-id="' + item.id + '">Edit</button>' +
                    '<button class="btn-small btn-cancel" data-id="' + item.id + '">Delete</button>' +
                    '<button class="btn-small btn-cart" data-id="' + item.id + '">Cart</button>' +
                '</td>';
            tbody.appendChild(tr);
        });
        attachTableBtns();
    }

    function attachTableBtns() {
        // EDIT buttons in table
        document.querySelectorAll('.btn-edit').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var id = btn.getAttribute('data-id');
                var item = stockData.find(function (s) { return s.id === id; });
                if (!item) return;
                document.getElementById('updateID').value = item.id;
                document.getElementById('updateName').value = item.name;
                document.getElementById('updateCategory').value = item.category;
                document.getElementById('updatePrice').value = item.price;
                document.getElementById('updateQty').value = item.qty;
                document.getElementById('updateStatus').value = item.status;
                document.getElementById('updateStock').scrollIntoView({ behavior: 'smooth' });
            });
        });

        // DELETE buttons in table
        document.querySelectorAll('.btn-cancel').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var id = btn.getAttribute('data-id');
                if (confirm('Are you sure you want to delete item ' + id + '?')) {
                    stockData = stockData.filter(function (s) { return s.id !== id; });
                    applyFilters();
                    renderChart();
                    showAlert('deleteAlert', 'Stock item ' + id + ' deleted successfully.', 'success');
                }
            });
        });

        // CART buttons in table
        document.querySelectorAll('.btn-cart').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var id = btn.getAttribute('data-id');
                var item = stockData.find(function (s) { return s.id === id; });
                if (!item) return;
                var already = cartData.find(function (c) { return c.id === id; });
                if (already) {
                    alert('This item is already in your cart.');
                    return;
                }
                cartData.push(item);
                renderCart();
                alert(item.name + ' added to cart!');
            });
        });
    }

    // =====================
    // FILTERS
    // =====================
    function applyFilters() {
        var search   = (document.getElementById('stockSearch')   ? document.getElementById('stockSearch').value.toLowerCase()   : '');
        var category = (document.getElementById('categoryFilter') ? document.getElementById('categoryFilter').value              : '');
        var price    = (document.getElementById('priceFilter')    ? document.getElementById('priceFilter').value                 : '');
        var status   = (document.getElementById('statusFilter')   ? document.getElementById('statusFilter').value                : '');

        var filtered = stockData.filter(function (item) {
            var matchSearch   = item.name.toLowerCase().includes(search);
            var matchCategory = category === '' || item.category === category;
            var matchStatus   = status   === '' || item.status   === status;
            var matchPrice    = true;
            if (price === 'low')  matchPrice = item.price < 100000;
            if (price === 'mid')  matchPrice = item.price >= 100000 && item.price <= 300000;
            if (price === 'high') matchPrice = item.price > 300000;
            return matchSearch && matchCategory && matchStatus && matchPrice;
        });
        renderTable(filtered);
    }

    ['stockSearch', 'categoryFilter', 'priceFilter', 'statusFilter'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', applyFilters);
    });

    // =====================
    // INSERT STOCK
    // =====================
    var insertBtn = document.getElementById('insertBtn');
    if (insertBtn) {
        insertBtn.addEventListener('click', function () {
            var name     = document.getElementById('newItemName').value.trim();
            var category = document.getElementById('newCategory').value;
            var price    = parseFloat(document.getElementById('newPrice').value);
            var qty      = parseInt(document.getElementById('newQty').value);
            var status   = document.getElementById('newStatus').value;

            if (!name || !category || isNaN(price) || isNaN(qty) || !status) {
                showAlert('insertAlert', 'Please fill in all fields correctly.', 'error');
                return;
            }

            var newId = 'ST-' + String(idCounter).padStart(3, '0');
            idCounter++;
            stockData.push({ id: newId, name: name, category: category, price: price, qty: qty, status: status });
            showAlert('insertAlert', 'Stock item "' + name + '" added successfully with ID ' + newId + '.', 'success');

            document.getElementById('newItemName').value = '';
            document.getElementById('newCategory').value = '';
            document.getElementById('newPrice').value    = '';
            document.getElementById('newQty').value      = '';
            document.getElementById('newStatus').value   = '';

            applyFilters();
            renderChart();
        });
    }

    // =====================
    // UPDATE STOCK
    // =====================
    var updateBtn = document.getElementById('updateBtn');
    if (updateBtn) {
        updateBtn.addEventListener('click', function () {
            var id       = document.getElementById('updateID').value.trim().toUpperCase();
            var name     = document.getElementById('updateName').value.trim();
            var category = document.getElementById('updateCategory').value;
            var price    = parseFloat(document.getElementById('updatePrice').value);
            var qty      = parseInt(document.getElementById('updateQty').value);
            var status   = document.getElementById('updateStatus').value;

            if (!id || !name || !category || isNaN(price) || isNaN(qty) || !status) {
                showAlert('updateAlert', 'Please fill in all fields correctly.', 'error');
                return;
            }

            var item = stockData.find(function (s) { return s.id === id; });
            if (!item) {
                showAlert('updateAlert', 'Stock ID "' + id + '" not found.', 'error');
                return;
            }

            item.name     = name;
            item.category = category;
            item.price    = price;
            item.qty      = qty;
            item.status   = status;

            showAlert('updateAlert', 'Stock item "' + id + '" updated successfully.', 'success');
            applyFilters();
            renderChart();
        });
    }

    // =====================
    // DELETE STOCK
    // =====================
    var deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function () {
            var id          = document.getElementById('deleteID').value.trim().toUpperCase();
            var confirmName = document.getElementById('deleteConfirmName').value.trim().toLowerCase();

            if (!id) {
                showAlert('deleteAlert', 'Please enter a Stock ID.', 'error');
                return;
            }

            var item = stockData.find(function (s) { return s.id === id; });
            if (!item) {
                showAlert('deleteAlert', 'Stock ID "' + id + '" not found.', 'error');
                return;
            }

            if (confirmName && item.name.toLowerCase() !== confirmName) {
                showAlert('deleteAlert', 'Item name does not match. Please confirm correctly.', 'error');
                return;
            }

            stockData = stockData.filter(function (s) { return s.id !== id; });
            showAlert('deleteAlert', 'Stock item "' + id + '" deleted successfully.', 'success');

            document.getElementById('deleteID').value          = '';
            document.getElementById('deleteConfirmName').value = '';

            applyFilters();
            renderChart();
        });
    }

    // =====================
    // CART RENDER
    // =====================
    function renderCart() {
        var tbody = document.getElementById('cartTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';
        if (cartData.length === 0) {
            tbody.innerHTML = '<tr class="table-row"><td class="table-cell" colspan="4">No items in cart yet.</td></tr>';
            document.getElementById('cartTotal').textContent = '0 PKR';
            return;
        }
        var total = 0;
        cartData.forEach(function (item) {
            total += item.price;
            var tr = document.createElement('tr');
            tr.className = 'table-row';
            tr.innerHTML =
                '<td class="table-cell">' + item.name + '</td>' +
                '<td class="table-cell">' + item.category + '</td>' +
                '<td class="table-cell">' + item.price.toLocaleString() + '</td>' +
                '<td class="table-cell"><button class="btn-small btn-cancel" data-cart-id="' + item.id + '">Remove</button></td>';
            tbody.appendChild(tr);
        });
        document.getElementById('cartTotal').textContent = total.toLocaleString() + ' PKR';

        document.querySelectorAll('[data-cart-id]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var cid = btn.getAttribute('data-cart-id');
                cartData = cartData.filter(function (c) { return c.id !== cid; });
                renderCart();
            });
        });
    }

    // =====================
    // ALERT HELPER
    // =====================
    function showAlert(boxId, message, type) {
        var box = document.getElementById(boxId);
        if (!box) return;
        box.className = 'alert-box ' + (type === 'success' ? 'alert-success' : 'alert-error');
        box.textContent = message;
        setTimeout(function () {
            box.className  = 'alert-box';
            box.textContent = '';
        }, 4000);
    }

    // =====================
    // BAR CHART
    // =====================
    function renderChart() {
        renderBarChart();
        renderPieChart();
    }

    function renderBarChart() {
        var container = document.getElementById('barChart');
        if (!container) return;

        var categories = ['Package', 'Decoration', 'Catering', 'Photography'];
        var colors     = ['bar-gold', 'bar-blue', 'bar-green', 'bar-red'];
        var totals     = categories.map(function (cat) {
            return stockData.filter(function (s) { return s.category === cat; })
                            .reduce(function (sum, s) { return sum + s.qty; }, 0);
        });
        var max = Math.max.apply(null, totals) || 1;

        container.innerHTML = '';
        categories.forEach(function (cat, i) {
            var pct = Math.round((totals[i] / max) * 100);

            var group = document.createElement('div');
            group.className = 'bar-group';

            var label = document.createElement('div');
            label.className = 'bar-label';
            label.textContent = cat;

            var track = document.createElement('div');
            track.className = 'bar-track';

            var fill = document.createElement('div');
            fill.className = 'bar-fill ' + colors[i];
            fill.style.width = '0%';
            track.appendChild(fill);

            var value = document.createElement('div');
            value.className = 'bar-value';
            value.textContent = totals[i];

            group.appendChild(label);
            group.appendChild(track);
            group.appendChild(value);
            container.appendChild(group);

            setTimeout(function () { fill.style.width = pct + '%'; }, 100);
        });
    }

    // =====================
    // PIE CHART (canvas)
    // =====================
    function renderPieChart() {
        var canvas = document.getElementById('pieChart');
        var legend = document.getElementById('pieLegend');
        if (!canvas || !legend) return;

        var available   = stockData.filter(function (s) { return s.status === 'Available';   }).length;
        var limited     = stockData.filter(function (s) { return s.status === 'Limited';     }).length;
        var unavailable = stockData.filter(function (s) { return s.status === 'Unavailable'; }).length;
        var total       = available + limited + unavailable || 1;

        var slices = [
            { label: 'Available',   value: available,   color: '#27ae60' },
            { label: 'Limited',     value: limited,     color: '#c9a84c' },
            { label: 'Unavailable', value: unavailable, color: '#c0392b' }
        ];

        var ctx    = canvas.getContext('2d');
        var size   = 160;
        canvas.width  = size;
        canvas.height = size;
        var cx     = size / 2;
        var cy     = size / 2;
        var radius = size / 2 - 4;
        var start  = -Math.PI / 2;

        ctx.clearRect(0, 0, size, size);

        slices.forEach(function (slice) {
            var angle = (slice.value / total) * 2 * Math.PI;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, radius, start, start + angle);
            ctx.closePath();
            ctx.fillStyle = slice.color;
            ctx.fill();
            start += angle;
        });

        legend.innerHTML = '';
        slices.forEach(function (slice) {
            var item = document.createElement('div');
            item.className = 'legend-item';

            var dot = document.createElement('div');
            dot.className = 'legend-dot';
            dot.style.background = slice.color;

            var text = document.createElement('span');
            text.textContent = slice.label + ': ' + slice.value;

            item.appendChild(dot);
            item.appendChild(text);
            legend.appendChild(item);
        });
    }

    // =====================
    // INIT
    // =====================
    renderTable(stockData);
    renderChart();
    renderCart();
});