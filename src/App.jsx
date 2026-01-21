import { useState } from "react";
import { Layout, Card, List, Button, Typography, Divider } from "antd";

const { Content, Sider } = Layout;
const { Text } = Typography;

export default function KassirUI() {
  const defaultTables = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Stol ${i + 1}`,
    orders: [
      { name: "Burger", qty: 1, price: 40000 },
      { name: "Pizza", qty: 2, price: 80000 },
    ],
  }));

  const [tables, setTables] = useState(defaultTables);
  const [activeTableId, setActiveTableId] = useState(null);

  const activeTable = tables.find((t) => t.id === activeTableId);
  const total =
    activeTable?.orders.reduce((sum, item) => sum + item.qty * item.price, 0) ||
    0;

  const handlePaid = () => {
    if (!activeTable) return;
    setTables((prev) => prev.filter((t) => t.id !== activeTableId));
    setActiveTableId(null);
  };

  const innerBorderColor = "#d9d9d9"; // ichki cardlar uchun gray border

  return (
    <Layout
      style={{
        width: 1100,
        height: 600,
        margin: "50px auto",
        border: "2px solid #797979", // eng katta div borderi original qora
        borderRadius: 8,
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      <Sider width={240} style={{ background: "#ffffff", padding: 12 }}>
        <Card
          title="Stollar"
          bordered
          style={{
            height: "100%",
            overflowY: "auto",
            background: "#ffffff",
            borderColor: innerBorderColor,
          }}
        >
          <List
            dataSource={tables}
            renderItem={(table) => {
              const isActive = activeTableId === table.id;
              return (
                <List.Item
                  style={{
                    marginBottom: 6,
                    cursor: "pointer",
                    borderRadius: 6,
                    padding: "10px 14px",
                    background: isActive ? "#d9f7be" : "#f6fff0",
                    border: isActive
                      ? `1px solid #52c41a`
                      : `1px solid ${innerBorderColor}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s",
                  }}
                  onClick={() => setActiveTableId(table.id)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#e6ffcc")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = isActive
                      ? "#d9f7be"
                      : "#f6fff0")
                  }
                >
                  <Text strong>{table.name}</Text>
                </List.Item>
              );
            }}
          />
        </Card>
      </Sider>

      <Content
        style={{ padding: "0 16px", display: "flex", flexDirection: "column" }}
      >
        <Card
          title={activeTable ? activeTable.name : "Stol tanlang"}
          bordered
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#ffffff",
            borderColor: innerBorderColor,
          }}
        >
          {activeTable && (
            <>
              <div style={{ flex: 1, overflowY: "auto", marginBottom: 8 }}>
                <List
                  dataSource={activeTable.orders}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: "#ffffff",
                        borderRadius: 4,
                        marginBottom: 4,
                        paddingLeft: "8px",
                        paddingRight: "8px",

                        border: `1px solid ${innerBorderColor}`,
                      }}
                    >
                      <Text>
                        {item.qty} x {item.name}
                      </Text>
                      <Text>{item.qty * item.price}</Text>
                    </List.Item>
                  )}
                />
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 600,
                }}
              >
                <Text>Jami</Text>
                <Text>{total}</Text>
              </div>
              <Button
                type="primary"
                onClick={handlePaid}
                style={{
                  marginTop: 16,
                  backgroundColor: "#52c41a",
                  borderColor: "#52c41a",
                }}
                block
              >
                To‘landi
              </Button>
            </>
          )}
        </Card>
      </Content>

      <Sider width={260}>
        <Card
          title="History"
          bordered
          style={{
            height: "100%",
            overflowY: "auto",
            background: "#ffffff",
            borderBottom: "#fff",
            borderRadius: "0",
          }}
        >
          <Text type="secondary">History panel keyinchalik ishlatiladi</Text>
        </Card>
      </Sider>
    </Layout>
  );
}
