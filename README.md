## React native incremental 

```
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  onAdd(i) {
    this.setState({ counter: i });
  }
  render() {
    return (
      <View style={styles.container}>
        <Adder value={this.state.counter} onAdd={i => this.onAdd(i)} />
      </View>
    );
  }
}

```

